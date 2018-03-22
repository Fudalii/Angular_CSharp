using System;
using System.Linq;
using AutoMapper;
using DatingApp.API.DTO;
using DatingApp.API.Models;

namespace DatingApp.API.Mapper
{
    public class AutoMapperProfile : Profile  
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => opt.ResolveUsing(d => CalculateAge(d.DateOfBirth))  
                )
                .ForMember(dest => dest.Id, opt => opt.Ignore());
        

            CreateMap<User, UserForDetailsDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => opt.ResolveUsing(d => CalculateAge(d.DateOfBirth))  
                );

            CreateMap<Photos, PhotoForDetaisDto>();
        }


        public static int CalculateAge(DateTime theDateTime)
            {
                var age = DateTime.Today.Year - theDateTime.Year;
                return age;
            }
        
    }
}