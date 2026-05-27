package com.PC2.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PC2.backend.dto.IncidenciaRequest;
import com.PC2.backend.dto.IncidenciaResponse;
import com.PC2.backend.service.IncidenciaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/incidencias")
public class IncidenciaController {

	private final IncidenciaService incidenciaService;

	public IncidenciaController(IncidenciaService incidenciaService) {
		this.incidenciaService = incidenciaService;
	}

	@GetMapping
	public List<IncidenciaResponse> obtenerTodas() {
		return incidenciaService.obtenerTodas();
	}

	@PutMapping("/{id}")
	public IncidenciaResponse actualizar(@PathVariable Long id, @Valid @RequestBody IncidenciaRequest request) {
		return incidenciaService.actualizar(id, request);
	}
}
