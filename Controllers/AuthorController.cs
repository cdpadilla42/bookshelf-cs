using Microsoft.AspNetCore.Mvc;
namespace Bookshelf_cs.Controllers;
using BulkyBookWebDotNet6MVC.Data;
using BulkyBookWebDotNet6MVC.Models;


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
}
