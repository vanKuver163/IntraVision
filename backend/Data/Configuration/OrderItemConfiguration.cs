using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Configuration;

public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.ToTable("OrderItem");
        
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.ProductName)
            .HasColumnName("productName")
            .HasColumnType("varchar(100)")
            .IsRequired();
        
        builder.Property(x => x.ProductPrice)
            .HasColumnName("productPrice")
            .IsRequired();
        
        builder.Property(x => x.Quantity)
            .HasColumnName("quantity")
            .IsRequired();
        
        builder.Property(x => x.OrderId)
            .HasColumnName("orderId")
            .IsRequired();

        builder.HasOne(oi => oi.Order)
            .WithMany(o => o.Items) 
            .HasForeignKey(oi => oi.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}