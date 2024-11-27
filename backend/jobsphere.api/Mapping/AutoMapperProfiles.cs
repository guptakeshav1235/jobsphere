﻿using AutoMapper;
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

            CreateMap<Company, CompanyResponseDto>().ReverseMap();
            CreateMap<Company, CompanyDto>().ReverseMap();
            CreateMap<Company, UpdateCompanyDto>().ReverseMap();

            CreateMap<PostJobDto, Job>()
            .ForMember(dest => dest.Requirements, opt =>
                        opt.MapFrom(src => src.Requirements != null
                            ? src.Requirements.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                                  .Select(r => r.Trim()).ToList()
                            : new List<string>()));

            CreateMap<Job, JobResponseDto>().ReverseMap();
        }
    }
}
