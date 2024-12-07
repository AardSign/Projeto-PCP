package com.pcp.backend.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcp.backend.api.model.SystemUser;
import com.pcp.backend.api.repository.SystemUserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SystemUserService {

    @Autowired
    private SystemUserRepository repository;

    public List<SystemUser> findAll() {
        return repository.findAll();
    }

    public Optional<SystemUser> findById(int id) {
        return repository.findById(id);
    }

    public SystemUser create(SystemUser user) {
        return repository.save(user);
    }

    public Optional<SystemUser> update(int id, SystemUser updatedUser) {
        return repository.findById(id).map(existingUser -> {
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setFavoriteParts(updatedUser.getFavoriteParts());
            existingUser.setSavedBuilds(updatedUser.getSavedBuilds());
            existingUser.setUpdatedAt(LocalDateTime.now());
            return repository.save(existingUser);
        });
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}


