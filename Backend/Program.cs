using PortfolioApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<SmtpSettings>(
    builder.Configuration.GetSection("SmtpSettings"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowedOrigins", policy =>
        policy.WithOrigins("http://localhost:5500", "https://portfoliotemplatete.netlify.app")
              .AllowAnyMethod()
              .AllowAnyHeader());
});

builder.Services.AddControllers();
var app = builder.Build();

app.UseCors("AllowedOrigins");
app.UseAuthorization();
app.MapControllers();
app.Run();
