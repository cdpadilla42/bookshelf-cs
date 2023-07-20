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

    // Post: /<controller>/
    [HttpPost]
    public ActionResult<Book> CreateBook([FromBody] Book obj)
    {
      _logger.LogInformation(1001, "Book passed");
      _logger.LogWarning(1001, obj.ToString());
      if (ModelState.IsValid)
      {
        _db.Books.Add(obj);
        _db.SaveChanges();
        return Ok(obj);
      }

      var errors = ModelState.Select(x => x.Value.Errors)
        .Where(y=>y.Count>0)
        .ToList();

      return BadRequest(errors);
    }

    [HttpGet("{id}")]
    public IActionResult GetBook(int? id)
    {
      if (id == null || id == 0)
      {
          return NotFound();
      }
      Book BookRes = _db.Books.Find(id);
      return Ok(BookRes);
    }

    [HttpPost("edit/{id}")]
    public IActionResult EditBook(Book obj)
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

    [HttpPost("delete/{id}")]
    public IActionResult DeleteBook(int? id)
    {
      if (id == null || id == 0)
      {
          return NotFound(id);
      }

      var BookFromDB = _db.Books.Find(id);

      _db.Books.Remove(BookFromDB);
      _db.SaveChanges();

     return Ok(BookFromDB);
    }
}
