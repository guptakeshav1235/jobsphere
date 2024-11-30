namespace jobsphere.api.Models.DTO
{
    public class JobWithApplicantsDto
    {
        public Guid JobId { get; set; }
        public string Title { get; set; }
        public ICollection<ApplicationDto> Applications {  get; set; }
    }
}
