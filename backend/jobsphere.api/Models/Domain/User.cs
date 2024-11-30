using System.ComponentModel.DataAnnotations;

namespace jobsphere.api.Models.Domain
{
    public enum UserRoles
    {
        student,
        recruiter
    }
    public class User
    {
        public Guid Id { get; set; }= Guid.NewGuid();

        [Required]
        public string FullName {  get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [EnumDataType(typeof(UserRoles))]
        public string Role { get; set; }// Stored as a string in the database
        public UserProfile Profile { get; set; }

        public DateTime CreatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
        public DateTime UpdatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
    }
}
