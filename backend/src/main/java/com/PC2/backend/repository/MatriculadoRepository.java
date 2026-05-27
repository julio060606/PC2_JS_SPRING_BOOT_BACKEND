package com.PC2.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PC2.backend.entity.Matriculado;

public interface MatriculadoRepository extends JpaRepository<Matriculado, Long> {

	long countByCursoId(Long cursoId);

	boolean existsByCursoIdAndEmailIgnoreCase(Long cursoId, String email);
}
