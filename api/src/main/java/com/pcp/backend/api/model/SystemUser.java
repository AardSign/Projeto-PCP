package com.pcp.backend.api.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class SystemUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Email
    @Column(unique = true)
    private String email;

    @NotNull
    @Size(min = 8, message = "A senha deve ter pelo menos 8 caracteres.")
    @Column(name = "senha", nullable = false) // Mapeia para a coluna "senha" no banco
    private String password;

    @NotNull
    @Column(name = "nome_usuario")
    private String username;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    
    @ElementCollection
    @CollectionTable(name = "user_saved_builds", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "build_id")
    @JsonIgnore
    private List<Integer> savedBuilds = new ArrayList<>();

    @Column(name = "criado_em", updatable = false)
    private String criadoEm;

    @Column(name = "atualizado_em")
    private String atualizadoEm;
    
    @JsonIgnore
    @ElementCollection
    @CollectionTable(name = "user_favorite_parts", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "part_id")
    private List<Integer> favoriteParts = new ArrayList<>();


   
    
    // Getters e Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }


public List<Integer> getSavedBuilds() {
    return savedBuilds;
}

public void setSavedBuilds(List<Integer> savedBuilds) {
    this.savedBuilds = savedBuilds;
}

public List<Integer> getFavoriteParts() {
    return favoriteParts;
}

public void setFavoriteParts(List<Integer> favoriteParts) {
    this.favoriteParts = favoriteParts;
}


}