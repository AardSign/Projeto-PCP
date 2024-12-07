package com.pcp.backend.api.service;

import com.pcp.backend.api.model.SystemUser;
import com.pcp.backend.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HttpSession session; // Injeta a sessão HTTP

    public boolean login(String username, String password) {
        // Busca o usuário por nome de usuário
        SystemUser user = userRepository.findByUsername(username).orElse(null);

        if (user != null && user.getPassword().equals(password)) {
            session.setAttribute("loggedInUser", user); // Salva o usuário na sessão
            return true;
        }
        return false;
    }

    public void logout() {
        session.removeAttribute("loggedInUser"); // Remove o usuário da sessão
    }

    public SystemUser getLoggedInUser() {
        SystemUser user = (SystemUser) session.getAttribute("loggedInUser");
        if (user == null) {
            System.out.println("Nenhum usuário encontrado na sessão.");
        } else {
            System.out.println("Usuário encontrado na sessão: " + user.getUsername());
        }
        return user;
    }

}
