using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactMagazine;
using ReactMagazine.Models;
using System.Reflection.Metadata.Ecma335;

namespace ReactMagazine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ILogger<ProductsController> _logger;
        private readonly ProductsDbContext _context;
        

        public ProductsController(ILogger<ProductsController> logger, ProductsDbContext context)
        {
            _logger = logger; 
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
          if (_context.Products == null) { return NotFound();}
          return await _context.Products.ToListAsync();
        }

        // GET: api/products/:id
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(long id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/products/
        [HttpPut()]
        public async Task<IActionResult> ChangeProduct(long id,string name, double price, string description)
        {
            Product product = new Product() { Id = id, Name = name, Description = description, Price = price };
            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(product.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Products/addProduct
        [HttpPost("addProduct")]
        public async Task<ActionResult<Product>> PostProduct(string name, double price, string description)
        {
            if (_context.Products == null)
            {
              return Problem("Entity set 'ProductsDbContext.Products'  is null.");
            }
            Product product = new Product() { Description = description, Name = name, Price = price };
            
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/:id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(long id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(long id)
        {
            return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
