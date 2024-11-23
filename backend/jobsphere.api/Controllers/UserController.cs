using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace jobsphere.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        [Route("signup")]
        public async Task<IActionResult> signup()
        {
            return Ok("You hit the signup endpoint");
        }
    }
}
