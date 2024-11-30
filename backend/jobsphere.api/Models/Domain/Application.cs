using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace jobsphere.api.Models.Domain
{
    public enum ApplicationStatus
    {
        pending,
        accepted,
        rejected
    }
    public class Application
    {
        public Guid Id { get; set; }=Guid.NewGuid();

        [Required]
        public Guid JobId { get; set; }

        [ForeignKey(nameof(JobId))]
        public Job Job { get; set; }

        [Required]
        public Guid ApplicantId { get; set; }

        [ForeignKey(nameof(ApplicantId))]
        public User Applicant { get; set; }

        [Required]
        [EnumDataType(typeof(ApplicationStatus))]
        public string Status { get; set; } = ApplicationStatus.pending.ToString();

        public DateTime CreatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
        public DateTime UpdatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
    }
}
