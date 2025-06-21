using backend.DTOs;
using backend.Models;
using backend.Utils;

namespace backend.Services;

public interface IOrderService
{
    Task<IEnumerable<Order>> GetOrdersAsync();
    Task<OperationResult> AddOrderAsync(List<CartItem> items, decimal orderAmount);
}