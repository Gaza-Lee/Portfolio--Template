using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Models;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace PortfolioApi.Controllers
{
    [ApiController]
    [Route("api/contact")]
    public class ContactController : ControllerBase
    {
        [HttpGet]
    public IActionResult Get() => Ok("Backend is running!");


        [HttpPost]
        public IActionResult SendMessage([FromBody] ContactForm form)
        {
             if (string.IsNullOrWhiteSpace(form.Name) ||
                string.IsNullOrWhiteSpace(form.Email) ||
                string.IsNullOrWhiteSpace(form.Subject) ||
                string.IsNullOrWhiteSpace(form.Message) ||
                !Regex.IsMatch(form.Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            {
                return BadRequest(new { success = false, message = "Invalid input." });
            }
            try
            {
                var mail = new MailMessage
                {
                    From = new MailAddress("your_email@example.com"),
                    Subject = form.Subject,
                    Body = $"From: {form.Name} <{form.Email}>\n\n{form.Message}"
                };
                mail.To.Add("your_email@example.com");

                using var smtp = new SmtpClient("smtp.provider.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("your_email@example.com", "your_password"),
                    EnableSsl = true
                };

                smtp.Send(mail);

                return Ok(new { success = true, message = "Message sent successfully." });
            }
            catch
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Error sending message.",
                });
            }
        }
    }
}
