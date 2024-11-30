using System.ComponentModel.DataAnnotations;

namespace jobsphere.api.Models.DTO
{
    public class PostJobDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Requirements { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Salary must be a positive number.")]
        public decimal Salary { get; set; }

        [Required]
        [Range(0, 50, ErrorMessage = "Experience level must be between 0 and 50 years")]
        public int ExperienceLevel { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string JobType { get; set; }

        [Required]
        public string Position { get; set; }

        [Required]
        public Guid CompanyId { get; set; }
    }
}
