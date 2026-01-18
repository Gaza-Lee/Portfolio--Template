using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class ContactForm
{
    [Required(ErrorMessage = "Name is required.")]
    [StringLength(100, ErrorMessage = "Name is too long.")]
    public string Name { get; set; } = "";

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email address.")]
    public string Email { get; set; } = "";

    [Required(ErrorMessage = "Subject is required.")]
    [StringLength(150, ErrorMessage = "Subject is too long.")]
    public string Subject { get; set; } = "";

    [Required(ErrorMessage = "Message is required.")]
    [StringLength(5000, ErrorMessage = "Message is too long.")]
    public string Message { get; set; } = "";
}
