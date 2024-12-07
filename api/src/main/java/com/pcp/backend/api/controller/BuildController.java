package com.pcp.backend.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pcp.backend.api.model.Build;
import com.pcp.backend.api.service.BuildService;

import java.util.List;

@RestController
@RequestMapping("/api/build")
public class BuildController {

    @Autowired
    private BuildService buildService;

    // Endpoint para buscar as builds de um usuário
    @GetMapping("/{userId}")
    public ResponseEntity<List<Build>> getBuildsByUserId(@PathVariable int userId) {
        List<Build> builds = buildService.findByUser(userId);
        if (builds.isEmpty()) {
            return ResponseEntity.noContent().build(); // Retorna 204 se nenhuma build for encontrada
        }
        return ResponseEntity.ok(builds);
    }


    @PostMapping
    public ResponseEntity<Build> saveBuild(@RequestBody Build build) {
        Build savedBuild = buildService.create(build);
        return ResponseEntity.ok(savedBuild);
    }



    // Endpoint para atualizar uma build existente
    @PutMapping("/{buildId}")
    public ResponseEntity<Build> updateBuild(@PathVariable int buildId, @RequestBody Build build) {
        return buildService.update(buildId, build)
                .map(updatedBuild -> ResponseEntity.ok(updatedBuild))
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para deletar uma build
    @DeleteMapping("/{buildId}")
    public ResponseEntity<Void> deleteBuild(@PathVariable int buildId) {
        buildService.delete(buildId);
        return ResponseEntity.noContent().build();
    }
}
