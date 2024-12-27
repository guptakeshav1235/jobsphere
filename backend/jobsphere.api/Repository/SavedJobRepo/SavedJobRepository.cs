using jobsphere.api.Data;
using jobsphere.api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace jobsphere.api.Repository.SavedJobRepo
{
    public class SavedJobRepository : ISavedJobRepository
    {
        private readonly ApplicationDbContext dbContext;

        public SavedJobRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task SaveJobAsync(SavedJobs savedJob)
        {
            await dbContext.SavedJobs.AddAsync(savedJob);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<SavedJobs>> GetSavedJobsAsync(Guid userId)
        {
            return await dbContext.SavedJobs
                .Where(sj => sj.UserId == userId)
                .ToListAsync();
        }

        public async Task<SavedJobs> GetSavedJobbyJobIdAsync(Guid jobId)
        {
            return await dbContext.SavedJobs.FirstOrDefaultAsync(sj => sj.JobId == jobId);
        }
    }
}
