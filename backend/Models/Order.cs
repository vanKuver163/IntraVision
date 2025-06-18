namespace backend.Models;

public class Order
{
    public int Id { get; init; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}