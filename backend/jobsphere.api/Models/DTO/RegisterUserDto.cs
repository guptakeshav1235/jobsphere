using jobsphere.api.Models.Domain;
using System.ComponentModel.DataAnnotations;

namespace jobsphere.api.Models.DTO
{
    public class RegisterUserDto
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        [EnumDataType(typeof(UserRoles))]
        public string? Role { get; set; }
        public IFormFile File { get; set; }
    }
}
