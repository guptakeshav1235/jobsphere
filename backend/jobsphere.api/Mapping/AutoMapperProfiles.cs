using AutoMapper;
using jobsphere.api.Models.Domain;
using jobsphere.api.Models.DTO;

namespace jobsphere.api.Mapping
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, RegisterUserDto>().ReverseMap();
            CreateMap<User, UserResponseDto>().ReverseMap();
            CreateMap<User, UpdateUserProfileResponseDto>().ReverseMap();
        }
    }
}
