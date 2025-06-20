using backend.DTOs;
using backend.Models;
using backend.Repository;
using backend.Utils;

namespace backend.Services;

public class OrderService(IRepository<Order> repository, ILogger<OrderService> logger) : IOrderService
{
    public async Task<OperationResult> AddOrderAsync(List<CartItem> items, decimal orderAmount)
    {
        try
        {
            var orderItems = items.Select(oItem => new OrderItem
            {
                ProductName = oItem.Product.Name,
                ProductPrice = oItem.Product.Price,
                Quantity = oItem.Quantity
            }).ToList();

            var order = new Order
            {
                OrderDate = DateTime.UtcNow,
                TotalAmount = orderAmount,
                Items = orderItems
            };

            await repository.AddAsync(order);
            return OperationResult.Success();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка добавления заказа в базу данных");
            return OperationResult.Fail("Ошибка добавления заказа");
        }
    }
}