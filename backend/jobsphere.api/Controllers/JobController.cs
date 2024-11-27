using AutoMapper;
using jobsphere.api.CustomValidation;
using jobsphere.api.Models.Domain;
using jobsphere.api.Models.DTO;
using jobsphere.api.Repository.JobRepo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace jobsphere.api.Controllers
{
    [Route("api/job")]
    [ApiController]
    [ServiceFilter(typeof(IsAuthenticatedAttribute))]
    public class JobController : ControllerBase
    {
        private readonly IJobRepository jobRepository;
        private readonly IMapper mapper;

        public JobController(IJobRepository jobRepository, IMapper mapper)
        {
            this.jobRepository = jobRepository;
            this.mapper = mapper;
        }
        [HttpPost("post")]
        public async Task<IActionResult> PostJob([FromBody] PostJobDto postJobDto)
        {
            var userId = HttpContext.Items["UserId"] as string;

            //Mapping Dto->Domain
            var job = mapper.Map<Job>(postJobDto);
            job.CreatedById = Guid.Parse(userId);

            var postJob = await jobRepository.PostJobAsync(job);

            //return Ok after mapping Domain->Dto
            return Ok(mapper.Map<JobResponseDto>(postJob));
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAllJobs([FromQuery] string keyword = "")
        {
            var jobs = await jobRepository.GetAllJobsAsync(keyword);
            if(jobs==null || !jobs.Any())
            {
                return NotFound(new { error = "Jobs not found" });
            }

            //return ok after mapping domain->dto
            return Ok(mapper.Map<IEnumerable<JobResponseDto>>(jobs));
        }

        [HttpGet("get/{id:Guid}")]
        public async Task<IActionResult> GetJobById([FromRoute] Guid id)
        {
            var job = await jobRepository.GetJobByIdAsync(id);
            if (job == null)
            {
                return NotFound(new { error = "Job not found" });
            }

            //return Ok after mapping Domain->Dto
            return Ok(mapper.Map<JobResponseDto>(job));
        }

        [HttpGet("getadminjobs")]
        public async Task<IActionResult> GetAdminJobs()
        {
            var adminId = HttpContext.Items["UserId"] as string;
            var jobs = await jobRepository.GetAdminJobsAsync(Guid.Parse(adminId));

            if (jobs == null || !jobs.Any())
            {
                return NotFound(new { error = "Jobs not found" });
            }

            //return Ok after mapping Domain->Dto
            return Ok(mapper.Map<IEnumerable<JobResponseDto>>(jobs));
        }
    }
}
