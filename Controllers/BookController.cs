using Microsoft.AspNetCore.Mvc;
namespace Bookshelf_cs.Controllers;
using Bookshelf_cs.Data;
using Bookshelf_cs.Models;


[ApiController]
[Route("[controller]")]
public class BookController : ControllerBase
{

    private readonly ApplicationDbContext _db;
    private readonly ILogger<BookController> _logger;

    public BookController(ILogger<BookController> logger, ApplicationDbContext db)
    {
        _logger = logger;
        _db = db;
    }

    [HttpGet]
    public IEnumerable<Book> Get()
    {
      IEnumerable<Book> BookList = _db.Books;
      return BookList;
    }

    // GET: /<controller>/
     [HttpGet("edit/{id}")]
    public IActionResult Edit(int? id)
    {
        if (id == null || id == 0)
        {
            return NotFound();
        }

        Book BookFromDb = _db.Books.Find(id);

        if (BookFromDb == null)
        {
            return NotFound();
        }

        return Ok(BookFromDb);
    }

    // Post: /<controller>/
    [HttpPost]
    public ActionResult<Book> Post([FromBody] Book obj)
    {
      _logger.LogInformation(1001, "Book passed");
      _logger.LogWarning(1001, obj.ToString());

      try
      {
        _db.Books.Add(obj);
        _db.SaveChanges();
        return Ok(obj);
      }
      catch (System.Exception)
      {
        // throw System.Exception();
        return Ok();
      }

      System.Console.WriteLine();


    }
}
