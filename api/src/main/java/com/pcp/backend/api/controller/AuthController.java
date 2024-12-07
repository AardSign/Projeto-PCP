package com.pcp.backend.api.controller;

import com.pcp.backend.api.model.SystemUser;
import com.pcp.backend.api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody SystemUser loginRequest) {
        boolean success = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (success) {
            SystemUser loggedInUser = authService.getLoggedInUser();
            return ResponseEntity.ok(loggedInUser);
        } else {
            return ResponseEntity.status(401).body("Credenciais inválidas.");
        }
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getLoggedInUser() {
        SystemUser user = authService.getLoggedInUser();
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("Nenhum usuário logado.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        authService.logout();
        return ResponseEntity.ok("Logout bem-sucedido.");
    }
}
