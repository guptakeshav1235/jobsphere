using jobsphere.api.Models.Domain;
using System.ComponentModel.DataAnnotations;

namespace jobsphere.api.Models.DTO
{
    public class JobResponseDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<string> Requirements { get; set; } = new List<string>();
        public decimal Salary { get; set; }
        public int ExperienceLevel { get; set; }
        public string Location { get; set; }
        public string JobType { get; set; }
        public string Position { get; set; }
        public CompanyResponseDto Company { get; set; }
        public ICollection<ApplicationDto> Applications { get; set; }
        public Guid CreatedById { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
