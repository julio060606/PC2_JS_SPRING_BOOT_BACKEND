package com.PC2.backend.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PC2.backend.dto.TareaRequest;
import com.PC2.backend.dto.TareaResponse;
import com.PC2.backend.service.TareaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {

	private final TareaService tareaService;

	public TareaController(TareaService tareaService) {
		this.tareaService = tareaService;
	}

	@GetMapping
	public List<TareaResponse> obtenerTodas() {
		return tareaService.obtenerTodas();
	}

	@PostMapping
	public ResponseEntity<TareaResponse> crear(@Valid @RequestBody TareaRequest request) {
		TareaResponse tarea = tareaService.crear(request);
		return ResponseEntity.created(URI.create("/api/tareas/" + tarea.id())).body(tarea);
	}

	@PutMapping("/{id}")
	public TareaResponse actualizar(@PathVariable Long id, @Valid @RequestBody TareaRequest request) {
		return tareaService.actualizar(id, request);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> eliminar(@PathVariable Long id) {
		tareaService.eliminar(id);
		return ResponseEntity.noContent().build();
	}
}
