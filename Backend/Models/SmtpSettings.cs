namespace PortfolioApi.Models;

public class SmtpSettings
{
    public string Server { get; set; } = "";
    public int Port { get; set; } = 587;
    public string SenderName { get; set; } = "";
    public string SenderEmail { get; set; } = "";
    public string Password { get; set; } = "";
    public string ReceiverEmail { get; set; } = "";
    public bool EnableSsl { get; set; } = true;
}
