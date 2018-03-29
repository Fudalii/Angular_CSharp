using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Helpers
{
    public class PagedList<T> : List<T>
    {
        public int CurentPage { get; set; } // aktualna strona
        public int TotalPages { get; set; } // liczba stron
        public int PageSize { get; set; } // ilosć na stronie
        public int TotalCount { get; set; }

        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
                PageSize = pageSize;
                TotalCount = count;
                CurentPage = pageNumber;
                TotalPages = (int)Math.Ceiling(count / (double)pageSize); 
                this.AddRange(items);
        } 


        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = await source.CountAsync(); // liczy iloc rekordó
            var items = await source.Skip( (pageNumber -1) *  pageSize ).Take(pageSize).ToListAsync(); // przeskakuję o iloc rekordów równą iloci stron wstecz. 
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
        
    }


}