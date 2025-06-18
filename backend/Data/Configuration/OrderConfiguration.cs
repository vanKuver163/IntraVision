using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Configuration;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Order");
        
        builder.HasKey(x => x.Id);

        builder.Property(x => x.OrderDate)
            .HasColumnName("orderDate")
            .HasColumnType("timestamp with time zone")
            .IsRequired();
        
        builder.Property(x => x.TotalAmount)
            .HasColumnName("totalAmount")
            .HasColumnType("numeric(18,2)")
            .IsRequired();
        
        builder.HasMany(x => x.Items)
            .WithOne(x => x.Order)
            .HasForeignKey(o => o.OrderId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();
        
        builder.HasIndex(x => x.OrderDate)
            .HasDatabaseName("IX_Order_OrderDate");
    }
}