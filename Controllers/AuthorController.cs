using Microsoft.AspNetCore.Mvc;
namespace Bookshelf_cs.Controllers;
using Bookshelf_cs.Data;
using Bookshelf_cs.Models;


[ApiController]
[Route("[controller]")]
public class AuthorController : ControllerBase
{

    private readonly ApplicationDbContext _db;
    private readonly ILogger<AuthorController> _logger;

    public AuthorController(ILogger<AuthorController> logger, ApplicationDbContext db)
    {
        _logger = logger;
        _db = db;
    }

    [HttpGet]
    public IEnumerable<Author> Get()
    {
      IEnumerable<Author> authorList = _db.Authors;
      return authorList;
    }

    // GET: /<controller>/
     [HttpGet("edit/{id}")]
    public IActionResult Edit(int? id)
    {
        if (id == null || id == 0)
        {
            return NotFound();
        }

        var AuthorFromDb = _db.Authors.Find(id);
        //var CategoryFromDb = _db.CategorySet.FirstOrDefault(u=>u.Id == id);
        //var CategoryFromDb = _db.CategorySet.SingleOrDefault(u=>u.Id == id);

        if (AuthorFromDb == null)
        {
            return NotFound();
        }

        return Ok(AuthorFromDb);
    }

    // Post: /<controller>/
    [HttpPost]
    public ActionResult<Author> Post([FromBody] Author obj)
    {
      _logger.LogInformation(1001, "Author passed");
      _logger.LogWarning(1001, obj.ToString());

      try
      {
        _db.Authors.Add(obj);
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
