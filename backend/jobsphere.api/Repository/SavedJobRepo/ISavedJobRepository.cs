using jobsphere.api.Models.Domain;

namespace jobsphere.api.Repository.SavedJobRepo
{
    public interface ISavedJobRepository
    {
        Task SaveJobAsync(SavedJobs savedJob);
        Task<IEnumerable<SavedJobs>> GetSavedJobsAsync(Guid userId);
        Task<SavedJobs> GetSavedJobbyJobIdAsync(Guid jobId);
    }
}
