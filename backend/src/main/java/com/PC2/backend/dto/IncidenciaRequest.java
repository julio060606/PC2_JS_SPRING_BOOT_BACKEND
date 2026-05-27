package com.PC2.backend.dto;

import com.PC2.backend.entity.EstadoIncidencia;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record IncidenciaRequest(
		@NotBlank @Size(max = 150) String titulo,
		@NotBlank @Size(max = 500) String descripcion,
		@NotNull EstadoIncidencia estado) {
}
