package com.pcp.backend.api.repository;

import com.pcp.backend.api.model.SystemUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<SystemUser, Integer> {
    Optional<SystemUser> findByEmail(String email); // Busca pelo email
    Optional<SystemUser> findByUsername(String username); // Busca pelo nome de usuário
}
