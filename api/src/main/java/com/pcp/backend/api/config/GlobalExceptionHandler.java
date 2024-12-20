//package com.pcp.backend.api.config;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//
//@ControllerAdvice
//public class GlobalExceptionHandler {
//
//    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
//
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<String> handleException(Exception e) {
//        logger.error("Erro global capturado: {}", e.getMessage(), e);
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno no servidor");
//    }
//}
//
