using jobsphere.api.Models.Domain;

namespace jobsphere.api.Repository.ApplicationRepo
{
    public interface IApplicationRepository
    {
        Task<Application> GetExistingApplicationAsync(Guid jobId, Guid applicantId);
        Task<Application> CreateApplicationAsync(Application application);
        Task<IEnumerable<Application>> GetApplicationsByUserIdAsync(Guid userId);
        Task<Application> GetApplicationByIdAsync(Guid applicationId);
        Task UpdateApplicationAsync(Application application);
    }
}
