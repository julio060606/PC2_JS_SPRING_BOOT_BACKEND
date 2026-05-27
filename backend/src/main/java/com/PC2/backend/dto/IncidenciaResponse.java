package com.PC2.backend.dto;

import com.PC2.backend.entity.EstadoIncidencia;

public record IncidenciaResponse(Long id, String titulo, String descripcion, EstadoIncidencia estado) {
}
