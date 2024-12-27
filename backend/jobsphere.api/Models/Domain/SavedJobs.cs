namespace jobsphere.api.Models.Domain
{
    public class SavedJobs
    {
        public Guid Id { get; set; }= Guid.NewGuid();
        public Guid JobId { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
