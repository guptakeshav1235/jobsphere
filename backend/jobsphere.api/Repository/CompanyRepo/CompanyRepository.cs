using jobsphere.api.Data;
using jobsphere.api.Models.Domain;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;

namespace jobsphere.api.Repository.CompanyRepo
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly ApplicationDbContext dbContext;

        public CompanyRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Company> GetCompanyAsync(string companyName)
        {
            return await dbContext.Companies.FirstOrDefaultAsync(c => c.Name == companyName);
        }

        public async Task<Company> RegisterCompanyAsync(Company company)
        {
            await dbContext.Companies.AddAsync(company);
            await dbContext.SaveChangesAsync();
            return company;
        }

        public async Task<IEnumerable<Company>> GetCompanyByUserIdAsync(Guid userId)
        {
            return await dbContext.Companies
                                  .Where(c => c.UserId == userId)
                                  .ToListAsync();
        }

        public async Task<Company> GetCompanyByIdAsync(Guid companyId)
        {
            return await dbContext.Companies.FindAsync(companyId);
        }

        public async Task<Company?> UpdateCompanyAsync(Guid companyId, Company updatedCompany)
        {
            var company = await dbContext.Companies.FindAsync(companyId);
            if (company == null)
            {
                return null;
            }

            company.Name= updatedCompany.Name;
            company.Description= updatedCompany.Description;
            company.Website= updatedCompany.Website;
            company.Location= updatedCompany.Location;

            await dbContext.SaveChangesAsync();
            return company;
        }
    }
}
