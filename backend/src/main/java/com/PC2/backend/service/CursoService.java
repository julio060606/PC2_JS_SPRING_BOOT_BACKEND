package com.PC2.backend.service;

import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.PC2.backend.dto.CursoResponse;
import com.PC2.backend.dto.MatriculadoRequest;
import com.PC2.backend.dto.MatriculadoResponse;
import com.PC2.backend.entity.Curso;
import com.PC2.backend.entity.Matriculado;
import com.PC2.backend.exception.BusinessRuleException;
import com.PC2.backend.exception.ResourceNotFoundException;
import com.PC2.backend.repository.CursoRepository;
import com.PC2.backend.repository.MatriculadoRepository;

@Service
@Transactional(readOnly = true)
public class CursoService {

	private final CursoRepository cursoRepository;
	private final MatriculadoRepository matriculadoRepository;

	public CursoService(CursoRepository cursoRepository, MatriculadoRepository matriculadoRepository) {
		this.cursoRepository = cursoRepository;
		this.matriculadoRepository = matriculadoRepository;
	}

	public List<CursoResponse> obtenerTodos() {
		return cursoRepository.findAll().stream().map(this::toResponse).toList();
	}

	@Transactional
	public MatriculadoResponse matricular(Long cursoId, MatriculadoRequest request) {
		Curso curso = cursoRepository.findByIdForEnrollment(cursoId)
				.orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado: " + cursoId));
		String email = request.email().trim().toLowerCase(Locale.ROOT);

		if (matriculadoRepository.countByCursoId(cursoId) >= curso.getCupos()) {
			throw new BusinessRuleException("El curso no tiene cupos disponibles.");
		}
		if (matriculadoRepository.existsByCursoIdAndEmailIgnoreCase(cursoId, email)) {
			throw new BusinessRuleException("El email ya esta matriculado en este curso.");
		}

		Matriculado matriculado = new Matriculado();
		matriculado.setCurso(curso);
		matriculado.setNombre(request.nombre().trim());
		matriculado.setEmail(email);
		return toResponse(matriculadoRepository.save(matriculado));
	}

	private CursoResponse toResponse(Curso curso) {
		List<MatriculadoResponse> matriculados = curso.getMatriculados().stream().map(this::toResponse).toList();
		int disponibles = Math.max(0, curso.getCupos() - matriculados.size());
		return new CursoResponse(curso.getId(), curso.getNombre(), curso.getDescripcion(), curso.getCupos(),
				disponibles, matriculados);
	}

	private MatriculadoResponse toResponse(Matriculado matriculado) {
		return new MatriculadoResponse(matriculado.getId(), matriculado.getNombre(), matriculado.getEmail());
	}
}
