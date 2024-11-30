using jobsphere.api.Models.Domain;

namespace jobsphere.api.Models.DTO
{
    public class ApplicationDto
    {
        public Guid ApplicationId { get; set; }
        public ApplicantDto Applicant { get; set; }
    }
}
