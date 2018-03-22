using System;
using AutoMapper;

namespace DatingApp.API.Mapper
{
    public class Extensions   // dziedziczy proFile da kalsy z mapami gdzie korzystamy z poniższej metody 
    {
        public int CalculateAge(DateTime theDateTime)
        {
            var age = DateTime.Today.Year - theDateTime.Year;
            return age;
        }
    }
}