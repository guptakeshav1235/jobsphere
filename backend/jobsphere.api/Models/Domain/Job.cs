using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace jobsphere.api.Models.Domain
{
    public class Job
    {
        public Guid Id { get; set; }=Guid.NewGuid();

        [Required]
        public string Title {  get; set; }

        [Required]
        public string Description { get; set; }
        public List<string>Requirements { get; set; }=new List<string>();

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Salary must be a positive number.")]
        public decimal Salary {  get; set; }

        [Required]
        [Range(0, 50, ErrorMessage = "Experience level must be between 0 and 50 years")]
        public int ExperienceLevel {  get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string JobType {  get; set; }

        [Required]
        public string Position {  get; set; }

        [Required]
        public Guid CompanyId { get; set; }

        [ForeignKey(nameof(CompanyId))]
        public Company Company { get; set; }

        [Required]
        public Guid CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        public User CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
        public DateTime UpdatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
    }
}
