package com.PC2.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PC2.backend.entity.Tarea;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
}
