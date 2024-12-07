package com.pcp.backend.api.repository;

import com.pcp.backend.api.model.Component;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComponentRepository extends JpaRepository<Component, Long> {
    // Aqui você pode adicionar métodos personalizados se necessário
}
