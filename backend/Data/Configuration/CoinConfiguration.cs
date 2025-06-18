using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Configuration;

public class CoinConfiguration : IEntityTypeConfiguration<Coin>
{
    public void Configure(EntityTypeBuilder<Coin> builder)
    {
        builder.ToTable("Coin");
        
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Denomination)
            .HasColumnName("denomination")
            .IsRequired();
        
        builder.Property(x => x.Amount)
            .HasColumnName("amount");
    }
}