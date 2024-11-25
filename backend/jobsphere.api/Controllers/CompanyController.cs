using AutoMapper;
using jobsphere.api.CustomValidation;
using jobsphere.api.Models.Domain;
using jobsphere.api.Models.DTO;
using jobsphere.api.Repository.CompanyRepo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace jobsphere.api.Controllers
{
    [Route("api/company")]
    [ApiController]
    [ServiceFilter(typeof(IsAuthenticatedAttribute))]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyRepository companyRepository;
        private readonly IMapper mapper;

        public CompanyController(ICompanyRepository companyRepository, IMapper mapper)
        {
            this.companyRepository = companyRepository;
            this.mapper = mapper;
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterCompany([FromBody] RegisterCompanyDto registerCompanyDto)
        {
            if(string.IsNullOrWhiteSpace(registerCompanyDto.CompanyName))
            {
                return BadRequest(new { error = "Company name is required" });
            }

            var existingCompany = await companyRepository.GetCompanyAsync(registerCompanyDto.CompanyName);
            if (existingCompany != null)
            {
                return BadRequest(new { error = "You can't register with the same company name" });
            }

            var userId= HttpContext.Items["UserId"] as string;
            var company = new Company
            {
                Name = registerCompanyDto.CompanyName,
                UserId = Guid.Parse(userId),
            };

            var newCompany = await companyRepository.RegisterCompanyAsync(company);

            //Return Ok after mapping Domain->Dto
            return Ok(mapper.Map<CompanyResponseDto>(newCompany));

        }

        [HttpGet("get")]
        public async Task<IActionResult> GetCompany()
        {
            var userId = HttpContext.Items["UserId"] as string;
            var companies = await companyRepository.GetCompanyByUserIdAsync(Guid.Parse(userId));

            if(companies==null || !companies.Any())
            {
                return NotFound(new { error = "Companies not found" });
            }

            //return Ok after mapping Domain->Dto
            return Ok(mapper.Map<IEnumerable<CompanyResponseDto>>(companies));

        }

        [HttpGet("get/{id:Guid}")]
        public async Task<IActionResult> GetCompanyById([FromRoute] Guid id)
        {
            var company = await companyRepository.GetCompanyByIdAsync(id);
            if (company == null)
            {
                return NotFound(new { error = "Company not found" });
            }

            //return Ok after mapping Domain->Dto
            return Ok(mapper.Map<CompanyResponseDto>(company));
        }

        [HttpPut("update/{id:Guid}")]
        public async Task<IActionResult> UpdateCompany([FromRoute] Guid id, [FromBody] UpdateCompanyDto updateCompanyDto)
        {
            //var file = Request.Form.Files.FirstOrDefault();
            //Implementing Cloudinary

            var existingCompany = await companyRepository.GetCompanyByIdAsync(id);
            if(existingCompany == null)
            {
                return NotFound(new { error = "Company Not Found" });
            }

            //Update the database after mapping Dto->Domain
            var updatedCompany = await companyRepository.UpdateCompanyAsync(id, (mapper.Map<Company>(updateCompanyDto)));
            if(updatedCompany == null)
            {
                return NotFound(new { error = "Company Not Found" });
            }

            //return Ok after mapping Domain->Dto
            return Ok(mapper.Map<CompanyDto>(updatedCompany));
        }
    }
}
