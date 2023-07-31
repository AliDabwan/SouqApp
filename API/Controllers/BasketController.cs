using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly SouqContext _context;
        public BasketController(SouqContext context)
        {
            _context = context;

        }
        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) return NotFound();
            // return  MapBasketToDto(basket);
                        return  basket.MapBasketToDto();
        }
 
      

        [HttpPost] // api/basket?productId=5&quantity=1
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) basket = CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails{Title="Product nNot Found"});
            basket.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetBasket",basket.MapBasketToDto()); 
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });

        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            //get basket
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) return NotFound();

            //remove item or reduce quantity
            basket.RemoveItem(productId,quantity);
            //save changes
             var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails{Title="Error in remove item from basket"});
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if(string.IsNullOrEmpty(buyerId)){
                Response.Cookies.Delete("buyerId");
                return null;
            }
            return await _context.Baskets
                        .Include(b => b.Items)
                        .ThenInclude(i => i.Product)
                        // .FirstOrDefaultAsync(b => b.BuyerId == Request.Cookies["buyerId"]);
                        .FirstOrDefaultAsync(b => b.BuyerId == buyerId);



        }
        private string GetBuyerId(){
            return User.Identity?.Name??Request.Cookies["buyerId"];
        }
        private Basket CreateBasket()
        {
            // var buyerId = Guid.NewGuid().ToString();
            var buyerId = User.Identity?.Name;
            if(string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                    var cookieOptions = new CookieOptions
                {
                    IsEssential = true,
                    Expires = DateTime.Now.AddDays(30)
                };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            }

          
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }
         
    }
}