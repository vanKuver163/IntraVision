namespace backend.DTOs;

public record ImportProductRequest(
        string Name,
        decimal Price,
        int Quantity,
        string ImagePath,
        string Brand
    );
