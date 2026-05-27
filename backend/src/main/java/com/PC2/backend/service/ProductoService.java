package com.PC2.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.PC2.backend.dto.ProductoRequest;
import com.PC2.backend.dto.ProductoResponse;
import com.PC2.backend.entity.Producto;
import com.PC2.backend.repository.ProductoRepository;

@Service
@Transactional(readOnly = true)
public class ProductoService {

	private final ProductoRepository productoRepository;

	public ProductoService(ProductoRepository productoRepository) {
		this.productoRepository = productoRepository;
	}

	public List<ProductoResponse> obtenerTodos() {
		return productoRepository.findAll().stream().map(this::toResponse).toList();
	}

	@Transactional
	public ProductoResponse crear(ProductoRequest request) {
		Producto producto = new Producto();
		producto.setNombre(request.nombre().trim());
		producto.setPrecio(request.precio());
		producto.setStock(request.stock());
		return toResponse(productoRepository.save(producto));
	}

	private ProductoResponse toResponse(Producto producto) {
		return new ProductoResponse(producto.getId(), producto.getNombre(), producto.getPrecio(), producto.getStock());
	}
}
