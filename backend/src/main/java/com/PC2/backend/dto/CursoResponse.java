package com.PC2.backend.dto;

import java.util.List;

public record CursoResponse(
		Long id,
		String nombre,
		String descripcion,
		Integer cupos,
		Integer cuposDisponibles,
		List<MatriculadoResponse> matriculados) {
}
