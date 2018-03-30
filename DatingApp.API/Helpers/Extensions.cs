using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddPagination(this HttpResponse response, int curentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(curentPage, itemsPerPage, totalItems, totalPages);
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }

         public static int CalculateAge(this DateTime theDateTime)
            {
                var age = DateTime.Today.Year - theDateTime.Year;
                return age;
            }
    }
}