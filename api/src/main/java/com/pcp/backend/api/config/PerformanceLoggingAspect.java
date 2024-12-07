//package com.pcp.backend.api.config;
//
//import org.aspectj.lang.annotation.Aspect;
//import org.aspectj.lang.annotation.Around;
//import org.aspectj.lang.ProceedingJoinPoint;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Component;
//
//@Aspect
//@Component
//public class PerformanceLoggingAspect {
//
//    private static final Logger logger = LoggerFactory.getLogger(PerformanceLoggingAspect.class);
//
//    @Around("execution(* com.pcp.backend..*(..))") // Aplica a todos os métodos no pacote especificado
//    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
//        long start = System.currentTimeMillis();
//        Object proceed = joinPoint.proceed();
//        long executionTime = System.currentTimeMillis() - start;
//        logger.info("{} executado em {}ms", joinPoint.getSignature(), executionTime);
//        return proceed;
//    }
//}