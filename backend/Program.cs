using System.Text.Json;
using System.Text.Json.Serialization;
using backend.Data;
using backend.Models;
using backend.Repository;
using backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(443, listenOptions =>
    {
        listenOptions.UseHttps("https/aspnetapp.pfx", "admin");
    });
});

builder.Services.AddControllers().AddJsonOptions(options => {
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});;

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
                       ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContextFactory<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<IRepository<Brand>, Repository<Brand>>();
builder.Services.AddScoped<IBrandService, BrandService>();

builder.Services.AddScoped<IRepository<Product>, Repository<Product>>();
builder.Services.AddScoped<IProductService, ProductService>();

builder.Services.AddScoped<IRepository<Coin>, Repository<Coin>>();
builder.Services.AddScoped<ICoinService, CoinService>();

builder.Services.AddScoped<IRepository<Order>, Repository<Order>>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services.AddSingleton<IStateService, StateService>();

builder.Services.AddScoped<ITransactionManager, EfTransactionManager>();


var app = builder.Build();

app.UseCors("AllowAll"); 

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();

app.UseHttpsRedirection();

app.MapControllers();

app.MapGet("/", () => "Hello World!")
    .WithName("GetHello")
    .WithOpenApi();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    
    try
    {
        SeedData.Initialize(services);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Произошла ошибка при заполнении базы данных");
    }
}

app.Run();


