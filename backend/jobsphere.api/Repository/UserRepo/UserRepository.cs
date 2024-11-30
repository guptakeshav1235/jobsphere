using jobsphere.api.Data;
using jobsphere.api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace jobsphere.api.Repository.UserRepo
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
        public async Task<User> CreateUserAsync(User user)
        {
            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetUserByIdAsync(Guid userId)
        {
            return await dbContext.Users.FindAsync(userId);
        }

        public async Task<User> UpdateProfileAsync(User user)
        {
            dbContext.Users.Update(user);
            await dbContext.SaveChangesAsync();
            return user;
        }
    }
}
