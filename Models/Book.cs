using System.ComponentModel.DataAnnotations;

namespace Bookshelf_cs.Models
{
  public class Book
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string? Name { get; set; }
		[Required]
		public int AuthorID { get; set; }
		public int GenreID { get; set; }
		public string? Summary { get; set; }
    public bool AudioBook { get; set; }
    public bool Rating { get; set; }
    public string? Status { get; set; }
    public string? Image { get; set; }
		public DateTime CreatedDateTime { get; set; } = DateTime.Now;
	}
}

