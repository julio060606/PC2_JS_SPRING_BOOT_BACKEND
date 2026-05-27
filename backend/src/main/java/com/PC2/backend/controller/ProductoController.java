package com.PC2.backend.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PC2.backend.dto.ProductoRequest;
import com.PC2.backend.dto.ProductoResponse;
import com.PC2.backend.service.ProductoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

	private final ProductoService productoService;

	public ProductoController(ProductoService productoService) {
		this.productoService = productoService;
	}

	@GetMapping
	public List<ProductoResponse> obtenerTodos() {
		return productoService.obtenerTodos();
	}

	@PostMapping
	public ResponseEntity<ProductoResponse> crear(@Valid @RequestBody ProductoRequest request) {
		ProductoResponse producto = productoService.crear(request);
		return ResponseEntity.created(URI.create("/api/productos/" + producto.id())).body(producto);
	}
}
