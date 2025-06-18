using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Configuration;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Product");
        
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Name)
            .HasColumnName("name")
            .HasColumnType("varchar(100)")
            .IsRequired();
        
        builder.Property(x => x.Price)
            .HasColumnName("price")
            .HasColumnType("numeric(18,2)")
            .IsRequired();

        builder.Property(x => x.ImagePath)
            .HasColumnType("text")
            .HasColumnName("imagePath")
            .IsRequired();
        
        builder.Property(x => x.BrandId)
            .HasColumnName("brandId")
            .IsRequired();

        builder.HasOne(x => x.Brand)
            .WithMany()
            .HasForeignKey(x => x.BrandId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasIndex(x => x.BrandId)
            .HasDatabaseName("IX_Product_BrandId");
        
        builder.HasIndex(x => x.Price)
            .HasDatabaseName("IX_Product_Price");
        
        builder.HasIndex(x => new { x.BrandId, x.Price })
            .HasDatabaseName("IX_Product_BrandId_Price");
    }
}