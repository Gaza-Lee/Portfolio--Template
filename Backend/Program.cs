var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.WithOrigins("http://localhost:5500", "https://portfoliotemplatete.netlify.app/")
              .AllowAnyMethod()
              .AllowAnyHeader());
});

builder.Services.AddControllers();
var app = builder.Build();

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();
app.Run();