using BulkyBookWebDotNet6MVC.Models;
using Microsoft.EntityFrameworkCore;

namespace BulkyBookWebDotNet6MVC.Data
{
  public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
		{
		}

    public DbSet<Author>? Authors { get; set; }
		public DbSet<Book>? Books { get; set; }
	}
}


