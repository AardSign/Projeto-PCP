package com.pcp.backend.api.util;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Implementação customizada de PageImpl para lidar com paginação manual.
 *
 * @param <T> O tipo dos elementos na página.
 */
public class CustomPageImpl<T> extends PageImpl<T> {

    /**
     * Construtor principal.
     *
     * @param content      Lista de elementos na página.
     * @param pageable     Configuração de paginação.
     * @param total        Número total de elementos.
     */
    public CustomPageImpl(List<T> content, Pageable pageable, long total) {
        super(content, pageable, total);
    }
}
