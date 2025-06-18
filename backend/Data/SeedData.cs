using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using var context = new ApplicationDbContext(
            serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>());

        if (context.Database.GetPendingMigrations().Any())
        {
            context.Database.Migrate();
        }

        using var transaction = context.Database.BeginTransaction();

        try
        {
            if (!context.Brands.Any())
            {
                context.Brands.AddRange(
                    new Brand { Name = "Pepsi" },
                    new Brand { Name = "Coca-Cola" },
                    new Brand { Name = "DrPepper" },
                    new Brand { Name = "Star Bar" }
                );
                context.SaveChanges();
            }

            if (!context.Coins.Any())
            {
                context.Coins.AddRange(
                    new Coin { Denomination = 1, Amount = 100 },
                    new Coin { Denomination = 2, Amount = 50 },
                    new Coin { Denomination = 5, Amount = 20 },
                    new Coin { Denomination = 10, Amount = 10 }
                );
            }

            if (!context.Products.Any())
            {
                var brands = context.Brands.ToDictionary(b => b.Name!, b => b.Id);

                context.Products.AddRange(
                    new Product
                    {
                        Name = "Coca-Cola в банке",
                        Price = 100,
                        BrandId = brands["Coca-Cola"],
                        ImagePath = "/Images/Coca-Cola.jpg"
                    },
                    new Product
                    {
                        Name = "Coca-Cola в бутылке",
                        Price = 115,
                        BrandId = brands["Coca-Cola"],
                        ImagePath = "/Images/Coca-Cola-Bottle.jpg"
                    },
                    new Product
                    {
                        Name = "Pepsi в банке",
                        Price = 90,
                        BrandId = brands["Pepsi"],
                        ImagePath = "/Images/Pepsi.jpg"
                    },
                    new Product
                    {
                        Name = "DrPepper вишневый",
                        Price = 85,
                        BrandId = brands["DrPepper"],
                        ImagePath = "/Images/DrPepper.jpg"
                    },
                    new Product
                    {
                        Name = "DrPepper Zero",
                        Price = 83,
                        BrandId = brands["DrPepper"],
                        ImagePath = "/Images/DrPepper-Zero.jpg"
                    },
                    new Product
                    {
                        Name = "Лимонад",
                        Price = 72,
                        BrandId = brands["Star Bar"],
                        ImagePath = "/Images/Lemonade.jpg"
                    },
                    new Product
                    {
                        Name = "Дюшес",
                        Price = 76,
                        BrandId = brands["Star Bar"],
                        ImagePath = "/Images/Duchess.jpg"
                    },
                    new Product
                    {
                        Name = "Тархун",
                        Price = 70,
                        BrandId = brands["Star Bar"],
                        ImagePath = "/Images/Tarragon.jpg"
                    }
                );
            }

            context.SaveChanges();
            transaction.Commit();
        }
        catch (Exception e)
        {
            transaction.Rollback();
            var logger = serviceProvider.GetService<ILogger<SeedData>>();
            logger?.LogError(e, "Seed data ошибка");
        }
    }
}