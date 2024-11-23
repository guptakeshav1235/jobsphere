using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace jobsphere.api.Models.Domain
{
    public class UserProfile
    {
        public Guid Id { get; set; }=Guid.NewGuid();
        public string Bio {  get; set; }
        public List<string> Skills { get; set; }=new List<string>();
        public string Resume {  get; set; }//URL to Resume File
        public string ResumeOriginalName { get; set; }
        public string ProfilePhoto {  get; set; }=string.Empty;

        [Required]
        public Guid UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
