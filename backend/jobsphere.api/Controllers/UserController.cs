using AutoMapper;
using jobsphere.api.CustomValidation;
using jobsphere.api.Models.Domain;
using jobsphere.api.Models.DTO;
using jobsphere.api.Repository.CloudinaryRepo;
using jobsphere.api.Repository.TokenRepo;
using jobsphere.api.Repository.UserRepo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace jobsphere.api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly ITokenRepository tokenRepository;
        private readonly ICloudinaryRepository cloudinaryRepository;
        private readonly IMapper mapper;

        public UserController(IUserRepository userRepository, ITokenRepository tokenRepository, ICloudinaryRepository cloudinaryRepository, IMapper mapper)
        {
            this.userRepository = userRepository;
            this.tokenRepository = tokenRepository;
            this.cloudinaryRepository = cloudinaryRepository;
            this.mapper = mapper;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterUserDto registerUserDto)
        {
            if (string.IsNullOrEmpty(registerUserDto.FullName) ||
                string.IsNullOrEmpty(registerUserDto.Email) ||
                string.IsNullOrEmpty(registerUserDto.PhoneNumber) ||
                string.IsNullOrEmpty(registerUserDto.Password) ||
                string.IsNullOrEmpty(registerUserDto.Role))
            {
                return BadRequest(new {error="Something is missing"});
            }

            var existingUser=await userRepository.GetUserByEmailAsync(registerUserDto.Email);
            if (existingUser != null)
            {
                return BadRequest(new { error = "User is already exist with this email" });
            }

            var hashedPassword=BCrypt.Net.BCrypt.HashPassword(registerUserDto.Password,10);

            //mapping Dto->Domain
            var user=mapper.Map<User>(registerUserDto);
            user.Password=hashedPassword;

            //Handle ProfilePhoto
            if (registerUserDto.File != null)
            {
                var fileBase64 = FileHelper.ConvertToBase64(registerUserDto.File);
                var cloudinaryImageUrl = await cloudinaryRepository.UploadImageAsync(fileBase64, registerUserDto.File.FileName);
                user.Profile = new UserProfile
                {
                    UserId=user.Id,
                    ProfilePhoto = cloudinaryImageUrl
                };
            }

            var newUser=await userRepository.CreateUserAsync(user);

            if (newUser != null)
            {
                //Generate Token and Set Cookie
                tokenRepository.GenerateTokenAndSetCookie(newUser.Id, Response);
                //return Ok after mapping Domain->Dto
                return Ok(mapper.Map<UserResponseDto>(newUser));
            }

            else
            {
                return BadRequest(new { error = "Invalid user data" });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
        {
            if (string.IsNullOrEmpty(loginUserDto.Email) ||
                string.IsNullOrEmpty(loginUserDto.Password) ||
                string.IsNullOrEmpty(loginUserDto.Role))
            {
                return BadRequest(new { error = "Something is missing" });
            }

            //Check for email
            var user = await userRepository.GetUserByEmailAsync(loginUserDto.Email);
            if (user == null)
            {
                return BadRequest(new { error = "Incorrect email or password" });
            }

            //Chack for password
            var isPasswordMatch = BCrypt.Net.BCrypt.Verify(loginUserDto.Password, user.Password);
            if (!isPasswordMatch)
            {
                return BadRequest(new { error = "Incorrect email or password" });
            }

            //Check for Role
            if (loginUserDto.Role != user.Role)
            {
                return BadRequest(new { error = "Account doesn't exist with the current role" });
            }

            //Generate Token and Set Cookie
            tokenRepository.GenerateTokenAndSetCookie(user.Id, Response);

            //return Ok after mapping Domain->Dto
            return Ok(mapper.Map<UserResponseDto>(user));
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            Response.Cookies.Append("jwt", "", new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow,
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
            });

            return Ok(new { message = "Logged out successfully" });
        }

        [HttpPost("profile/update")]
        [ServiceFilter(typeof(IsAuthenticatedAttribute))]
        public async Task<IActionResult> UpdateProfile([FromForm] UpdateUserProfileDto updateUserProfileDto)
        {
            var userId = HttpContext.Items["UserId"] as string;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token.");

            var user = await userRepository.GetUserByIdAsync(Guid.Parse(userId));
            if (user == null)
            {
                return NotFound(new { error = "User not found" });
            }

            //Update Fields
            if (!string.IsNullOrEmpty(updateUserProfileDto.FullName)) user.FullName = updateUserProfileDto.FullName;
            if (!string.IsNullOrEmpty(updateUserProfileDto.Email)) user.Email = updateUserProfileDto.Email;
            if (!string.IsNullOrEmpty(updateUserProfileDto.PhoneNumber)) user.PhoneNumber = updateUserProfileDto.PhoneNumber;
            if (!string.IsNullOrEmpty(updateUserProfileDto.Bio)) user.Profile.Bio = updateUserProfileDto.Bio;
            if (!string.IsNullOrEmpty(updateUserProfileDto.Skills)) user.Profile.Skills= [.. updateUserProfileDto.Skills.Split(',')];

            //Handle Resume and ProfilePhoto
            if (updateUserProfileDto.File != null)
            {
                var base64Resume = FileHelper.ConvertToBase64(updateUserProfileDto.File);
                var cloudinaryResumeUrl = await cloudinaryRepository.UploadFileAsync(base64Resume, updateUserProfileDto.File.FileName);
                user.Profile.Resume = cloudinaryResumeUrl;
                user.Profile.ResumeOriginalName = updateUserProfileDto.File.FileName;
            }

            if (updateUserProfileDto.ImageFile!=null)
            {
                var base64Image = FileHelper.ConvertToBase64(updateUserProfileDto.ImageFile);
                var cloudinaryImageUrl = await cloudinaryRepository.UploadImageAsync(base64Image, updateUserProfileDto.ImageFile.FileName);
                user.Profile.ProfilePhoto = cloudinaryImageUrl;
            }

            user.UpdatedAt= TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

            var updatedUser=await userRepository.UpdateProfileAsync(user);

            //Return Ok after mapping Domain->Dto
            return Ok(mapper.Map<UpdateUserProfileResponseDto>(updatedUser));
        }

        [HttpGet("me")]
        [ServiceFilter(typeof(IsAuthenticatedAttribute))]
        public async Task<IActionResult> GetMe()
        {
            //var user = HttpContext.Items["User"] as User;
            var userId = HttpContext.Items["UserId"] as string;
            var user = await userRepository.GetUserByIdAsync(Guid.Parse(userId));
            return Ok(mapper.Map<UserResponseDto>(user));
        }

    }
    public static class FileHelper
    {
        public static string ConvertToBase64(IFormFile file)
        {
            using var memoryStream = new MemoryStream();
            file.CopyTo(memoryStream);
            var fileBytes = memoryStream.ToArray();
            return Convert.ToBase64String(fileBytes);
        }
    }

}
