package com.pcp.backend.api.controller;

import com.pcp.backend.api.model.Favorite;
import com.pcp.backend.api.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    // Retorna a lista de favoritos do usuário
    @GetMapping("/{tableName}/{userId}")
    public ResponseEntity<List<Favorite>> getFavoritesByUserId(
            @PathVariable String tableName,
            @PathVariable Long userId) {
        List<Favorite> favorites = favoriteService.getFavoritesByUserId(userId);
        
        // Adiciona o tableName para cada favorito na lista, se necessário
        for (Favorite favorite : favorites) {
            favorite.setTableName(tableName);
        }
        
        return ResponseEntity.ok(favorites);
    }

    /**
     * Endpoint para adicionar um favorito.
     *
     * @param favorite O objeto favorito enviado no corpo da requisição.
     * @param tableName O nome da tabela enviado como parâmetro.
     * @return O favorito adicionado.
     */
    @PostMapping("/{tableName}")
    public ResponseEntity<?> addFavorite(
        @RequestBody Favorite favorite, 
        @PathVariable String tableName
    ) {
        try {
            Favorite savedFavorite = favoriteService.addFavorite(favorite, tableName);
            return ResponseEntity.ok(savedFavorite);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao salvar o favorito: " + e.getMessage());
        }
    }



    // Remove uma parte dos favoritos
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeFavorite(@PathVariable Long id) {
        try {
            favoriteService.removeFavorite(id);
            return ResponseEntity.ok("Parte removida dos favoritos com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao remover parte dos favoritos: " + e.getMessage());
        }
    }
}
