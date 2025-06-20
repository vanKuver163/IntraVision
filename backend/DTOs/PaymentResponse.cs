namespace backend.DTOs;

public record PaymentResponse(
    bool Success,
    List<CoinItem> Change
);
