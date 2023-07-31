using System.Linq;
using System.Text.Json;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {

        private readonly SouqContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;

        public ProductsController(SouqContext context,IMapper mapper ,ImageService imageService)
        {
            _mapper = mapper;
            _imageService = imageService;
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query=  _context.Products
            .Sort(productParams.orderBy)
            .Search(productParams.searchTerm)
            .Filter(productParams.brands,productParams.types)
            .AsQueryable();
 
           var products=await PagedList<Product>
           .ToPagedList(query,productParams.PageNumber,productParams.PageSize);
           Response.AddPaginationHeader(products.PaginationData);
          
            // Response.Headers.Add("Pagination",JsonSerializer.Serialize(products.PaginationData));

           return products;

            
            
        }

        [HttpGet("{id}",Name ="GetProduct")] //api/products/2
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }


         [HttpGet("filters")] //api/products/2
        public async Task<ActionResult> GetFilters()
        {
            //Distinct() to get uniq brands not repeated
            var brands = await _context.Products.Select(p=>p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p=>p.Type).Distinct().ToListAsync();

            return Ok(new {brands,types});

           
        }
        [Authorize(Roles="Admin")]
        [HttpPost]
         public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto productDto)
        {
            var product=_mapper.Map<Product>(productDto);
            if(productDto.File!=null)
            {
                var imageResult=await _imageService.AddImageAsync(productDto.File);
                if(imageResult.Error!=null)
                return BadRequest(new ProblemDetails{Title=imageResult.Error.Message});
                product.PictureUrl=imageResult.SecureUrl.ToString();
                product.PublicId=imageResult.PublicId;

            }

           _context.Products.Add(product); 
           var result=await _context.SaveChangesAsync()>0;

           if(result) return CreatedAtRoute("GetProduct",new {Id=product.Id},product);
           return BadRequest(new ProblemDetails{Title="Problem creating new product"});

           
        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm]UpdateProductDto productDto)
        {
            var product = await _context.Products.FindAsync(productDto.Id);

            if (product == null) return NotFound();

            _mapper.Map(productDto,product);

             if(productDto.File!=null)
            {
                var imageResult=await _imageService.AddImageAsync(productDto.File);
                if(imageResult.Error!=null)
                return BadRequest(new ProblemDetails{Title=imageResult.Error.Message});

                if(!string.IsNullOrEmpty(product.PublicId))
                await _imageService.DeleteImageAsync(product.PublicId);

                product.PictureUrl=imageResult.SecureUrl.ToString();
                product.PublicId=imageResult.PublicId;

            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(product);

            return BadRequest(new ProblemDetails { Title = "Problem updating product" });
        }
         [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();
            
             if(!string.IsNullOrEmpty(product.PublicId))
                await _imageService.DeleteImageAsync(product.PublicId);

                _context.Products.Remove(product);
        
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem Deleting product" });
        }
    }
}