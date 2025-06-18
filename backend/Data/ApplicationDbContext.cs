using backend.Data.Configuration;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Brand> Brands { get; set; }
    public DbSet<Coin> Coins { get; set; }
    
    public DbSet<Product> Products { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new ProductConfiguration());
        modelBuilder.ApplyConfiguration(new OrderConfiguration());
        modelBuilder.ApplyConfiguration(new BrandConfiguration());
        modelBuilder.ApplyConfiguration(new CoinConfiguration());
        modelBuilder.ApplyConfiguration(new OrderItemConfiguration());
    }
}