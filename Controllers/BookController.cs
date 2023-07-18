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
    public IEnumerable<Book> GetBooks()
    {
      IEnumerable<Book> BookList = _db.Books;
      return BookList;
    }

    [HttpGet("edit/{id}")]
    public IActionResult GetBook(int? id)
    {
      if (id == null || id == 0)
      {
          return NotFound();
      }
      Book BookRes = _db.Books.Find(id);
      return Ok(BookRes);
    }

    // GET: /<controller>/
    [HttpPost("edit/{id}")]
    public IActionResult Edit(Book obj)
    {
      if (ModelState.IsValid)
      {
          _db.Books.Update(obj);
          _db.SaveChanges();
          return Ok(obj);
      }

      var errors = ModelState.Select(x => x.Value.Errors)
        .Where(y=>y.Count>0)
        .ToList();

      return BadRequest(errors);
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
        return Ok(obj);
      }

      System.Console.WriteLine();


    }
}
