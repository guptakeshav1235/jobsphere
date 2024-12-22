using System.ComponentModel.DataAnnotations;

namespace jobsphere.api.Models.DTO
{
    public class UserProfileDto
    {
        public Guid Id { get; set; }
        public string? Bio { get; set; }
        public List<string> Skills { get; set; }
        public string? Resume { get; set; }
        public string? ResumeOriginalName { get; set; }
        public string ProfilePhoto { get; set; }
    }
}
