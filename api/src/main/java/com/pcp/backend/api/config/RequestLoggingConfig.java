//package com.pcp.backend.api.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.filter.CommonsRequestLoggingFilter;
//
//@Configuration
//public class RequestLoggingConfig {
//
//    @Bean
//    public CommonsRequestLoggingFilter logFilter() {
//        CommonsRequestLoggingFilter filter = new CommonsRequestLoggingFilter();
//        filter.setIncludeClientInfo(true); // Inclui IP do cliente
//        filter.setIncludeQueryString(true); // Inclui parâmetros na URL
//        filter.setIncludePayload(true); // Inclui payload (ex.: corpo JSON)
//        filter.setMaxPayloadLength(10000); // Limita o tamanho do payload no log
//        filter.setIncludeHeaders(true); // Inclui cabeçalhos HTTP
//        return filter;
//    }
//}
