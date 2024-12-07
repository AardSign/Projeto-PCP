package com.pcp.backend.api.service;

import com.pcp.backend.api.model.Favorite;
import com.pcp.backend.api.repository.FavoriteRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {
	
	@PersistenceContext
    private EntityManager entityManager;
	
	
    @Autowired
    private FavoriteRepository favoriteRepository;

    public List<Favorite> getFavoritesByUserId(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    /**
     * Salva um favorito no banco de dados, incluindo o nome da tabela (tableName).
     *
     * @param favorite O objeto favorito a ser salvo.
     * @param tableName O nome da tabela a ser associado ao favorito.
     * @return O favorito salvo.
     */
    public Favorite addFavorite(Favorite favorite, String tableName) {
        // Adiciona o tableName ao favorito antes de salvar
        favorite.setTableName(tableName);
        return favoriteRepository.save(favorite);
    }

    public void removeFavorite(Long id) {
        favoriteRepository.deleteById(id);
    }
    
    public String getPartName(String tableName, String partId) {
        String query = "SELECT Name FROM " + tableName + " WHERE id = :partId";
        try {
            return (String) entityManager.createNativeQuery(query)
                .setParameter("partId", partId)
                .getSingleResult();
        } catch (Exception e) {
            return null; // Caso não encontre a parte
        }
    }
}
