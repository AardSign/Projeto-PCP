package com.pcp.backend.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.pcp.backend.api.model.SystemUser;
import com.pcp.backend.api.service.SystemUserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class SystemUserController {

    @Autowired
    private SystemUserService service;

    @GetMapping
    public List<SystemUser> getAllUsers() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SystemUser> getUserById(@PathVariable int id) {
        return service.findById(id)
            .map(user -> ResponseEntity.ok().body(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<SystemUser> updateUser(@PathVariable int id, @RequestBody SystemUser updatedUser) {
        return service.update(id, updatedUser)
            .map(user -> ResponseEntity.ok().body(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<SystemUser> createUser(@Validated @RequestBody SystemUser user) {
        SystemUser createdUser = service.create(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

