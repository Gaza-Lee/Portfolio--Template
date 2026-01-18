using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PortfolioApi.Models;
using System.Net;
using System.Net.Mail;

namespace PortfolioApi.Controllers
{
    [ApiController]
    [Route("api/contact")]
    public class ContactController : ControllerBase
    {
        private readonly SmtpSettings _smtpSettings;
        private readonly ILogger<ContactController> _logger;

        public ContactController(IOptions<SmtpSettings> smtpSettings, ILogger<ContactController> logger)
        {
            _smtpSettings = smtpSettings.Value;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get() => Ok("Backend is running!");

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] ContactForm form)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { success = false, message = "Invalid input. Please ensure all fields are filled correctly." });
            }

            try
            {
                using var mail = new MailMessage
                {
                    From = new MailAddress(_smtpSettings.SenderEmail, _smtpSettings.SenderName),
                    Subject = $"[Portfolio] {form.Subject}",
                    Body = $"You have a new contact message:\n\nName: {form.Name}\nEmail: {form.Email}\n\nMessage:\n{form.Message}",
                    IsBodyHtml = false
                };
                mail.To.Add(_smtpSettings.ReceiverEmail);

                using var smtp = new SmtpClient(_smtpSettings.Server)
                {
                    Port = _smtpSettings.Port,
                    Credentials = new NetworkCredential(_smtpSettings.SenderEmail, _smtpSettings.Password),
                    EnableSsl = _smtpSettings.EnableSsl
                };

                await smtp.SendMailAsync(mail);

                return Ok(new { success = true, message = "Message sent successfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send contact message from {Email}", form.Email);
                return StatusCode(500, new
                {
                    success = false,
                    message = "Error sending message. Please try again later."
                });
            }
        }
    }
}
