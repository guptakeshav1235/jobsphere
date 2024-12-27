using AutoMapper;
using jobsphere.api.CustomValidation;
using jobsphere.api.Models.Domain;
using jobsphere.api.Models.DTO;
using jobsphere.api.Repository.JobRepo;
using jobsphere.api.Repository.SavedJobRepo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace jobsphere.api.Controllers
{
    [Route("api/saved/jobs")]
    [ApiController]
    [ServiceFilter(typeof(IsAuthenticatedAttribute))]
    public class SavedJobsController : ControllerBase
    {
        private readonly IJobRepository jobRepository;
        private readonly ISavedJobRepository savedJobRepository;
        private readonly IMapper mapper;

        public SavedJobsController(IJobRepository jobRepository, ISavedJobRepository savedJobRepository, IMapper mapper)
        {
            this.jobRepository = jobRepository;
            this.savedJobRepository = savedJobRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> SaveJob([FromBody] Guid jobId)
        {
            var userId = Guid.Parse(HttpContext.Items["UserId"] as string);
            if (userId != null)
            {
                var job = await jobRepository.GetJobByIdAsync(jobId);
                if (job == null)
                {
                    return NotFound(new { error = "Job not found" });
                }

                var savedJob = await savedJobRepository.GetSavedJobbyJobIdAsync(jobId);
                if (savedJob != null)
                {
                    return BadRequest(new { error = "Job Already Saved" });
                }
                savedJob = new SavedJobs
                {
                    JobId = jobId,
                    UserId = userId,
                    CreatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"))
                };

                await savedJobRepository.SaveJobAsync(savedJob);
                return Ok(new {message="Job Saved Successfully"});
            }
            return BadRequest("Something Went wrong");
        }

        [HttpGet]
        public async Task<IActionResult> GetSavedJobs()
        {
            var userId = Guid.Parse(HttpContext.Items["UserId"] as string);
            if (userId != null)
            {
                var savedJobs = await savedJobRepository.GetSavedJobsAsync(userId);
                if (savedJobs == null || !savedJobs.Any())
                {
                    return NotFound(new { error = "No Saved Jobs Found" });
                }

                var savedJobDetails = new List<JobResponseDto>();
                foreach (var savedJob in savedJobs)
                {
                    var job = await jobRepository.GetJobByIdAsync(savedJob.JobId);
                    if (job == null)
                    {
                        return NotFound(new { error = "Job not found" });
                    }
                    var savedJobDetail = mapper.Map<JobResponseDto>(job);
                    savedJobDetails.Add(savedJobDetail);
                }

                return Ok(savedJobDetails);
            }
            return BadRequest("Something Went wrong");
        }
    }
}
