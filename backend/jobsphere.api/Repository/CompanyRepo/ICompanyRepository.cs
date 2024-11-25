using jobsphere.api.Models.Domain;

namespace jobsphere.api.Repository.CompanyRepo
{
    public interface ICompanyRepository
    {
        Task<Company> GetCompanyAsync(string companyName);
        Task<Company> RegisterCompanyAsync(Company company);
        Task<IEnumerable<Company>> GetCompanyByUserIdAsync(Guid userId);
        Task<Company> GetCompanyByIdAsync(Guid companyId);
        Task<Company?> UpdateCompanyAsync(Guid companyId, Company updatedCompany);
    }
}
