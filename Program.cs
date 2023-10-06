using Microsoft.EntityFrameworkCore;
using ReactMagazine;
using ReactMagazine.Middleware;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Загрузка сервисов в контейнер
builder.Services.AddCors(option =>
{
    option.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        ;
    });
});
builder.Services.AddControllersWithViews();
string connection = builder.Configuration.GetConnectionString(name: "DefaultConnection");
builder.Services.AddDbContext<ProductsDbContext>(opt => opt.UseSqlServer(connection));
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseCors("AllowAll");
app.UseStaticFiles();
app.UseRouting();

// Middleware for time check
app.UseMiddleware<WorkingHoursMiddleware>();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;
app.Run();
