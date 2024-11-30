using jobsphere.api.Models.Domain;

namespace jobsphere.api.Models.DTO
{
    public class ApplicationResponseDto
    {
        public Guid Id { get; set; }
        public JobResponseDto Job { get; set; }
        public Guid ApplicantId { get; set; }
        public string Status { get; set; }
    }
}
