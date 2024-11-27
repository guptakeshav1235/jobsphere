using jobsphere.api.Data;
using jobsphere.api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace jobsphere.api.Repository.JobRepo
{
    public class JobRepository : IJobRepository
    {
        private readonly ApplicationDbContext dbContext;

        public JobRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Job> PostJobAsync(Job job)
        {
            await dbContext.Jobs.AddAsync(job);
            await dbContext.SaveChangesAsync();
            return job;
        }

        public async Task<IEnumerable<Job>> GetAllJobsAsync(string keyword)
        {
            return await dbContext.Jobs
                                   .Include(j=>j.Company)
                                   .Where(j => EF.Functions.Like(j.Title, $"%{keyword}") ||
                                              EF.Functions.Like(j.Description, $"%{keyword}"))
                                   .OrderByDescending(j => j.CreatedAt)
                                   .ToListAsync();
        }

        public async Task<Job> GetJobByIdAsync(Guid jobId)
        {
            return await dbContext.Jobs
                                   .Include(j=>j.Company)
                                  .FirstOrDefaultAsync(j => j.Id == jobId);
        }

        public async Task<IEnumerable<Job>> GetAdminJobsAsync(Guid adminId)
        {
            return await dbContext.Jobs
                                   .Include(j => j.Company)
                                  .Where(j => j.CreatedById == adminId)
                                  .OrderByDescending(j => j.CreatedAt)
                                  .ToListAsync();
        }
    }
}
