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

    // Post: /<controller>/
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Post(Author obj)
    {
        if(obj.Name == obj.DisplayOrder.ToString())
        {
            ModelState.AddModelError("name", "Display order cannot match the name.");
        }

        if (ModelState.IsValid)
        {
            _db.Authors.Add(obj);
            _db.SaveChanges();
            TempData["success"] = "Category created successfully";
            return RedirectToAction("Index");
        }

        return View(obj);
    }
}
