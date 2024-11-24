using jobsphere.api.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace jobsphere.api.CustomValidation
{
    public class IsAuthenticatedAttribute : Attribute, IAsyncAuthorizationFilter
    {
        private readonly IConfiguration configuration;
        private readonly ApplicationDbContext dbContext;

        public IsAuthenticatedAttribute(IConfiguration configuration, ApplicationDbContext dbContext)
        {
            this.configuration = configuration;
            this.dbContext = dbContext;
        }
        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
           var httpContext=context.HttpContext;
            //Get the token from cookies
            var token = httpContext.Request.Cookies["jwt"];
            if (string.IsNullOrEmpty(token))
            {
                httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await httpContext.Response.WriteAsync("User not authenticated");
                return;
            }

            try
            {
                //Validate the token
                var key = Encoding.ASCII.GetBytes(configuration["Jwt:Secret"]);
                var tokenHandler = new JwtSecurityTokenHandler();
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var userId = principal.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await httpContext.Response.WriteAsync("Unauthorized: Invalid Token");
                    return;
                }
                httpContext.Items["UserId"] = userId;
            }
            catch (Exception ex)
            {
                httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                await httpContext.Response.WriteAsync("Internal Server Error");
            }
        }
    }
}
