package com.pcp.backend.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pcp.backend.api.model.Build;

public interface BuildRepository extends JpaRepository<Build, Integer> {
    List<Build> findBySystemUserId(int systemUserId);
}

