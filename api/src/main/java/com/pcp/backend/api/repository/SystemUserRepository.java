package com.pcp.backend.api.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.pcp.backend.api.model.SystemUser;

import java.util.Optional;

public interface SystemUserRepository extends JpaRepository<SystemUser, Integer> {
    Optional<SystemUser> findByEmail(String email);
}

