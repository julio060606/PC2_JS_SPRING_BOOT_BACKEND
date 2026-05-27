package com.PC2.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.PC2.backend.dto.IncidenciaRequest;
import com.PC2.backend.dto.IncidenciaResponse;
import com.PC2.backend.entity.Incidencia;
import com.PC2.backend.exception.ResourceNotFoundException;
import com.PC2.backend.repository.IncidenciaRepository;

@Service
@Transactional(readOnly = true)
public class IncidenciaService {

	private final IncidenciaRepository incidenciaRepository;

	public IncidenciaService(IncidenciaRepository incidenciaRepository) {
		this.incidenciaRepository = incidenciaRepository;
	}

	public List<IncidenciaResponse> obtenerTodas() {
		return incidenciaRepository.findAll().stream().map(this::toResponse).toList();
	}

	@Transactional
	public IncidenciaResponse actualizar(Long id, IncidenciaRequest request) {
		Incidencia incidencia = incidenciaRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Incidencia no encontrada: " + id));
		incidencia.setTitulo(request.titulo().trim());
		incidencia.setDescripcion(request.descripcion().trim());
		incidencia.setEstado(request.estado());
		return toResponse(incidenciaRepository.save(incidencia));
	}

	private IncidenciaResponse toResponse(Incidencia incidencia) {
		return new IncidenciaResponse(incidencia.getId(), incidencia.getTitulo(), incidencia.getDescripcion(),
				incidencia.getEstado());
	}
}
