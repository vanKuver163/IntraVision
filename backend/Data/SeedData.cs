using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        var logger = serviceProvider.GetRequiredService<ILogger<SeedData>>();

        using var context = new ApplicationDbContext(
            serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>());

        context.Database.Migrate();

        try
        {
            if (!context.Brands.Any())
            {
                logger.LogInformation("Загрузка Brands...");

                var brands = new[]
                {
                        new Brand { Name = "Pepsi" },
                        new Brand { Name = "Coca-Cola" },
                        new Brand { Name = "DrPepper" },
                        new Brand { Name = "Star Bar" }
                    };

                context.Brands.AddRange(brands);
                context.SaveChanges();
            }

            if (!context.Coins.Any())
            {
                logger.LogInformation("Загрузка Coins...");

                var coins = new[]
                {
                        new Coin { Denomination = 1, Amount = 100 },
                        new Coin { Denomination = 2, Amount = 50 },
                        new Coin { Denomination = 5, Amount = 20 },
                        new Coin { Denomination = 10, Amount = 10 }
                    };

                context.Coins.AddRange(coins);
                context.SaveChanges();
            }

            if (!context.Products.Any())
            {
                logger.LogInformation("Загрузка Products...");
             
                var cocaCola = context.Brands.FirstOrDefault(b => b.Name == "Coca-Cola") ?? new Brand { Name = "Coca-Cola" };
                var pepsi = context.Brands.FirstOrDefault(b => b.Name == "Pepsi") ?? new Brand { Name = "Pepsi" };
                var drPepper = context.Brands.FirstOrDefault(b => b.Name == "DrPepper") ?? new Brand { Name = "DrPepper" };
                var starBar = context.Brands.FirstOrDefault(b => b.Name == "Star Bar") ?? new Brand { Name = "Star Bar" };

                var products = new[]
                {
                        new Product
                        {
                            Name = "Coca-Cola в банке",
                            Price = 100,
                            Quantity = 10,
                            Brand = cocaCola,
                            ImagePath = "/Images/Coca-Cola.jpg"
                        },
                        new Product
                        {
                            Name = "Coca-Cola в бутылке",
                            Price = 115,
                            Quantity = 5,
                            Brand = cocaCola,
                            ImagePath = "/Images/Coca-Cola-Bottle.jpg"
                        },
                        new Product
                        {
                            Name = "Pepsi в банке",
                            Price = 90,
                            Quantity = 16,
                            Brand = pepsi,
                            ImagePath = "/Images/Pepsi.jpg"
                        },
                        new Product
                        {
                            Name = "DrPepper вишневый",
                            Price = 85,
                            Quantity = 10,
                            Brand = drPepper,
                            ImagePath = "/Images/DrPepper.jpg"
                        },
                        new Product
                        {
                            Name = "DrPepper Zero",
                            Price = 83,
                            Quantity = 10,
                            Brand = drPepper,
                            ImagePath = "/Images/DrPepper-Zero.jpg"
                        },
                        new Product
                        {
                            Name = "Лимонад",
                            Price = 72,
                            Quantity = 17,
                            Brand = starBar,
                            ImagePath = "/Images/Lemonade.jpg"
                        },
                        new Product
                        {
                            Name = "Дюшес",
                            Price = 76,
                            Quantity = 20,
                            Brand = starBar,
                            ImagePath = "/Images/Duchess.jpg"
                        },
                        new Product
                        {
                            Name = "Тархун",
                            Price = 70,
                            Quantity = 7,
                            Brand = starBar,
                            ImagePath = "/Images/Tarragon.jpg"
                        }
                    };

                context.Products.AddRange(products);
                context.SaveChanges();
            }

            logger.LogInformation("Заполнение базы данных успешно завершено");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка при заполнении базы данных");
            throw;
        }
    }

}