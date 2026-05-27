package com.PC2.backend.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PC2.backend.dto.CursoResponse;
import com.PC2.backend.dto.MatriculadoRequest;
import com.PC2.backend.dto.MatriculadoResponse;
import com.PC2.backend.service.CursoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {

	private final CursoService cursoService;

	public CursoController(CursoService cursoService) {
		this.cursoService = cursoService;
	}

	@GetMapping
	public List<CursoResponse> obtenerTodos() {
		return cursoService.obtenerTodos();
	}

	@PostMapping("/{id}/matriculados")
	public ResponseEntity<MatriculadoResponse> matricular(@PathVariable Long id,
			@Valid @RequestBody MatriculadoRequest request) {
		MatriculadoResponse matriculado = cursoService.matricular(id, request);
		URI location = URI.create("/api/cursos/" + id + "/matriculados/" + matriculado.id());
		return ResponseEntity.created(location).body(matriculado);
	}
}
