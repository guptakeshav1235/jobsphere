using jobsphere.api.Models.Domain;

namespace jobsphere.api.Repository.JobRepo
{
    public interface IJobRepository
    {
        Task<Job> PostJobAsync(Job job);
        Task<IEnumerable<Job>> GetAllJobsAsync(string keyword);
        Task<Job> GetJobByIdAsync(Guid jobId);
        Task<IEnumerable<Job>> GetAdminJobsAsync(Guid adminId);
    }
}
