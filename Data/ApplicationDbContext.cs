using Bookshelf_cs.Models;
using Microsoft.EntityFrameworkCore;

namespace Bookshelf_cs.Data
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


