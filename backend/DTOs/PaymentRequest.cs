using backend.Models;

namespace backend.DTOs;

public record PaymentRequest(
    List<CoinItem> Payment,
    List<CartItem> Order
);

public record CoinItem(
    CoinsResponse Coin,
    int Quantity
);

public record CartItem(
    Product Product,
    int Quantity
);