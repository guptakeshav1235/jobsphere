using jobsphere.api.Data;
using jobsphere.api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace jobsphere.api.Repository.ApplicationRepo
{
    public class ApplicationRepository : IApplicationRepository
    {
        private readonly ApplicationDbContext dbContext;

        public ApplicationRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public async Task<Application> GetExistingApplicationAsync(Guid jobId, Guid applicantId)
        {
            return await dbContext.Applications
                                  .FirstOrDefaultAsync(a => a.JobId == jobId && a.ApplicantId == applicantId);
        }
        public async Task<Application> CreateApplicationAsync(Application application)
        {
            await dbContext.Applications.AddAsync(application);
            await dbContext.SaveChangesAsync();
            return application;
        }

        public async Task<IEnumerable<Application>> GetApplicationsByUserIdAsync(Guid userId)
        {
            return await dbContext.Applications
                                   .Include(a => a.Job)
                                        .ThenInclude(j => j.Company)
                                  .Where(a => a.ApplicantId == userId)
                                  .OrderByDescending(a => a.CreatedAt)
                                  .ToListAsync();
        }

        public async Task<Application> GetApplicationByIdAsync(Guid applicationId)
        {
            return await dbContext.Applications
                                  .FirstOrDefaultAsync(a => a.Id == applicationId);
        }

        public async Task UpdateApplicationAsync(Application application)
        {
            dbContext.Applications.Update (application);
            await dbContext.SaveChangesAsync();
        }
    }
}
