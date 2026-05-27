package com.PC2.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PC2.backend.entity.Incidencia;

public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {
}
