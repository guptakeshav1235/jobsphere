using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace jobsphere.api.Models.Domain
{
    public class Company
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Website {  get; set; }
        public string? Location {  get; set; }
        public string? Logo {  get; set; }//URL to Company Logo

        [Required]
        public Guid UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        public DateTime CreatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
        public DateTime UpdatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
    }
}
