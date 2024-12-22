using jobsphere.api.Models.Domain;
namespace jobsphere.api.Models.DTO
{
    public class CompanyDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Website { get; set; }
        public string Location { get; set; }
        public string Logo { get; set; }//URL to Company Logo
        public UserResponseDto User { get; set; }
    }
}
