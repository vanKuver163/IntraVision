namespace backend.DTOs;

public record UpdateProductQuantityRequest(
    int Quantity,
    int? ProductId,
    string? ProductName
);