package com.PC2.backend.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProductoRequest(
		@NotBlank @Size(max = 120) String nombre,
		@NotNull @DecimalMin("0.00") @Digits(integer = 8, fraction = 2) BigDecimal precio,
		@NotNull @Min(0) Integer stock) {
}
