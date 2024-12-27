using AutoMapper;
using jobsphere.api.CustomValidation;
using jobsphere.api.Models.Domain;
using jobsphere.api.Models.DTO;
using jobsphere.api.Repository.ApplicationRepo;
using jobsphere.api.Repository.JobRepo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace jobsphere.api.Controllers
{
    [Route("api/application")]
    [ApiController]
    [ServiceFilter(typeof(IsAuthenticatedAttribute))]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationRepository applicationRepository;
        private readonly IJobRepository jobRepository;
        private readonly IMapper mapper;

        public ApplicationController(IApplicationRepository applicationRepository, IJobRepository jobRepository, IMapper mapper)
        {
            this.applicationRepository = applicationRepository;
            this.jobRepository = jobRepository;
            this.mapper = mapper;
        }
        [HttpPost("apply/{id:Guid}")]
        public async Task<IActionResult> ApplyJob([FromRoute] Guid id)
        {
            var userId = HttpContext.Items["UserId"] as string;
            var existingApplication = await applicationRepository.GetExistingApplicationAsync(id, Guid.Parse(userId));

            // check if the user has already applied for the job
            if (existingApplication != null)
            {
                return BadRequest(new { error = "You have already applied for this job" });
            }

            // check if the jobs exists
            var job=await jobRepository.GetJobByIdAsync(id);
            if (job == null)
            {
                return NotFound(new { error = "Job not found." });
            }

            var newApplication = new Application
            {
                JobId = id,
                ApplicantId = Guid.Parse(userId),
                CreatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"))
            };

            await applicationRepository.CreateApplicationAsync(newApplication);
            await jobRepository.AddApplicationToJobAsync(job, newApplication);

            //return Ok after mapping Domain->Dto
            return Ok(mapper.Map<ApplicationResponseDto>(newApplication));
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAppliedJobs()
        {
            var userId = HttpContext.Items["UserId"] as string;
            var applications = await applicationRepository.GetApplicationsByUserIdAsync(Guid.Parse(userId));

            if (applications == null || !applications.Any())
            {
                return NotFound(new {error= "No applications found" });
            }

            //return Ok after mapping Domain->Dto
            return Ok(mapper.Map<IEnumerable<ApplicationResponseDto>>(applications));
        }

        [HttpGet("{id:Guid}/applicants")]
        public async Task<IActionResult> GetApplicants([FromRoute] Guid id)
        {
            var job = await jobRepository.GetJobWithApplicantsAsync(id);
            if (job == null) {
                return NotFound(new { error = "Job not found" });
            }

            //return Ok after mapping Domain->Dto
            return Ok(mapper.Map<JobWithApplicantsDto>(job));
        }

        [HttpPost("{id:Guid}/status/update")]
        public async Task<IActionResult> UpdateStatus([FromRoute] Guid id, [FromBody] UpdateStatusDto updateStatusDto)
        {
            if (string.IsNullOrEmpty(updateStatusDto.Status))
            {
                return BadRequest(new { error = "Status is required" });
            }

            var application = await applicationRepository.GetApplicationByIdAsync(id);
            if(application == null)
            {
                return NotFound(new { error = "Application not found" });
            }
            application.Status = updateStatusDto.Status.ToLower();
            application.UpdatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
            await applicationRepository.UpdateApplicationAsync(application);

            return Ok(new { message = "Status updated successfully" });
        }
    }
}
