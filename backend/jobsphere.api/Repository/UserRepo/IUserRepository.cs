using jobsphere.api.Models.Domain;

namespace jobsphere.api.Repository.UserRepo
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmailAsync(string email);
        Task<User> CreateUserAsync(User user);
        Task<User> GetUserByIdAsync(Guid userId);
        Task<User> UpdateProfileAsync(User user);
    }
}
