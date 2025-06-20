namespace backend.Models;

public class Product
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public string? ImagePath { get; set; }
    public int BrandId { get; set; }
    public Brand? Brand { get; set; }
}