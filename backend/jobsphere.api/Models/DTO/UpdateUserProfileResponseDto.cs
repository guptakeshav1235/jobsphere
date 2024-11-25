﻿using jobsphere.api.Models.Domain;

namespace jobsphere.api.Models.DTO
{
    public class UpdateUserProfileResponseDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
        public UserProfile Profile { get; set; }
    }
}