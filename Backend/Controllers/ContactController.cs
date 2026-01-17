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
        private readonly IConfiguration _configuration;

        public ContactController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

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
                return BadRequest(new { success = false, message = "Invalid input. Please ensure all fields are filled correctly." });
            }

            try
            {
                var smtpSettings = _configuration.GetSection("SmtpSettings");
                var server = smtpSettings["Server"];
                var port = int.Parse(smtpSettings["Port"] ?? "587");
                var senderEmail = smtpSettings["SenderEmail"];
                var password = smtpSettings["Password"];
                var receiverEmail = smtpSettings["ReceiverEmail"];
                var enableSsl = bool.Parse(smtpSettings["EnableSsl"] ?? "true");

                var mail = new MailMessage
                {
                    From = new MailAddress(senderEmail, smtpSettings["SenderName"]),
                    Subject = $"[Portfolio] {form.Subject}",
                    Body = $"You have a new contact message:\n\nName: {form.Name}\nEmail: {form.Email}\n\nMessage:\n{form.Message}",
                    IsBodyHtml = false
                };
                mail.To.Add(receiverEmail);

                using var smtp = new SmtpClient(server)
                {
                    Port = port,
                    Credentials = new NetworkCredential(senderEmail, password),
                    EnableSsl = enableSsl
                };

                smtp.Send(mail);

                return Ok(new { success = true, message = "Message sent successfully!" });
            }
            catch (Exception ex)
            {
                // In production, you would log 'ex' using a logging framework.
                return StatusCode(500, new
                {
                    success = false,
                    message = "Error sending message. Please try again later.",
                    debugInfo = ex.Message // Optional: remove in production
                });
            }
        }
    }
}
