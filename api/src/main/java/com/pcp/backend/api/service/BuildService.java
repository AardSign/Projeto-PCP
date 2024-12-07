package com.pcp.backend.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcp.backend.api.model.Build;
import com.pcp.backend.api.repository.BuildRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BuildService {

    @Autowired
    private BuildRepository repository;

    public List<Build> findAll() {
        return repository.findAll();
    }

    public Optional<Build> findById(int id) {
        return repository.findById(id);
    }

    public List<Build> findByUser(int userId) {
        return repository.findBySystemUserId(userId);
    }

    
    
    
    public Build create(Build build) {
         return repository.save(build);
    }

    public Optional<Build> update(int id, Build updatedBuild) {
        return repository.findById(id).map(existingBuild -> {
            existingBuild.setNome(updatedBuild.getNome());
            existingBuild.setProcessador(updatedBuild.getProcessador());
            existingBuild.setCooler(updatedBuild.getCooler());
            existingBuild.setPlacaMae(updatedBuild.getPlacaMae());
            existingBuild.setGpu(updatedBuild.getGpu());
            existingBuild.setRam(updatedBuild.getRam());
            existingBuild.setArmazenamento(updatedBuild.getArmazenamento());
            existingBuild.setFonte(updatedBuild.getFonte());
            existingBuild.setGabinete(updatedBuild.getGabinete());
            existingBuild.setAtualizadoEm(LocalDateTime.now());
            return repository.save(existingBuild);
        });
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}

