using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Configuration;

public class BrandConfiguration : IEntityTypeConfiguration<Brand>
{
    public void Configure(EntityTypeBuilder<Brand> builder)
    {
        builder.ToTable("Brand");
        
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Name)
            .HasColumnName("name")
            .HasColumnType("varchar(100)")
            .IsRequired();
        
        builder.HasIndex(x => x.Name)
            .HasDatabaseName("IX_Brand_Name")
            .IsUnique();
    }
}