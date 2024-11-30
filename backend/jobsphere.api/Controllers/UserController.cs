using AutoMapper;
using jobsphere.api.CustomValidation;
using jobsphere.api.Models.Domain;
using jobsphere.api.Models.DTO;
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
        private readonly IMapper mapper;

        public UserController(IUserRepository userRepository, ITokenRepository tokenRepository, IMapper mapper)
        {
            this.userRepository = userRepository;
            this.tokenRepository = tokenRepository;
            this.mapper = mapper;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto)
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
                SameSite = SameSiteMode.Strict,
                Secure = true,
            });

            return Ok(new { message = "Logged out successfully" });
        }

        [HttpPost("profile/update")]
        [ServiceFilter(typeof(IsAuthenticatedAttribute))]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserProfileDto updateUserProfileDto)
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

            user.UpdatedAt= TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

            var updatedUser=await userRepository.UpdateProfileAsync(user);

            //Return Ok after mapping Domain->Dto
            return Ok(mapper.Map<UpdateUserProfileResponseDto>(updatedUser));
        }
    }
}
