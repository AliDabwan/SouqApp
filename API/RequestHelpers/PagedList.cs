using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{
    public class PagedList<T> : List<T>
    {
        public PagedList(List<T> items , int count,int pageNumber,int pageSize)
        {

            //math.ceiling round to near intger
            PaginationData=new PaginationData{
                TotalCount=count,
                PageSize=pageSize,
                CurrentPage=pageNumber,
                TotalPages=(int)Math.Ceiling(count/(double)pageSize)
            };
            AddRange(items);

        }
        public PaginationData PaginationData { get; set; }

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query,int PageNumber,int PageSize)
        {
            var count =await query.CountAsync();

            // var newTotalPages=(int)Math.Ceiling(count/(double)PageSize);
            // if(newTotalPages<(PageNumber))
            // PageNumber=1;
            



            var items=await query.Skip((PageNumber-1)*PageSize).Take(PageSize).ToListAsync();

            return new PagedList<T>(items,count,PageNumber,PageSize);

        }
    }
}