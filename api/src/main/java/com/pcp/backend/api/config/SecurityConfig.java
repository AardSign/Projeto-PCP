package com.pcp.backend.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desativa CSRF
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // Permite acesso a todas as requisições
            )
            .anonymous(anonymous -> anonymous.disable()) // Desativa autenticação anônima
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS) // Garante que a sessão seja sempre criada
            );

        return http.build();
    }
}
