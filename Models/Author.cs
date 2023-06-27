using System.ComponentModel.DataAnnotations;

namespace Bookshelf_cs.Models
{
  public class Author
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string? Name { get; set; }
		public DateTime CreatedDateTime { get; set; } = DateTime.Now;
	}
}

