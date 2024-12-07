package com.pcp.backend.api.config;

import org.springframework.boot.web.servlet.server.Session;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SessionConfig {

    @Bean
    public Session.Cookie sessionCookie() {
        Session.Cookie cookie = new Session.Cookie();
        cookie.setName("JSESSIONID");
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // Use true se estiver em HTTPS
        cookie.setPath("/");
        return cookie;
    }
}

