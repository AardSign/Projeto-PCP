package com.pcp.backend.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.pcp.backend.api.model.Component;
import com.pcp.backend.api.service.ComponentService;

import java.util.List;

@RestController
@RequestMapping("/api/components")
public class ComponentController {

    private static final List<String> ALLOWED_TABLES = List.of(
        "cases_detailed",
        "cpu_coolers_detailed",
        "cpus_detailed",
        "gpus_detailed",
        "memory_detailed",
        "motherboards_detailed",
        "power_supplies_detailed",
        "storage_detailed"
    );

    @Autowired
    private ComponentService componentService;

    /**
     * Endpoint para buscar componentes de uma tabela específica.
     * Valida o nome da tabela antes de realizar a busca.
     *
     * @param tableName Nome da tabela.
     * @param page Número da página.
     * @param size Tamanho da página.
     * @return Lista paginada de componentes.
     */
    @GetMapping("/{tableName}")
    public ResponseEntity<?> getComponents(
        @PathVariable String tableName,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        // Validar o nome da tabela
        if (!ALLOWED_TABLES.contains(tableName)) {
            return ResponseEntity.badRequest().body("Tabela não permitida: " + tableName);
        }

        try {
            // Paginar resultados
            Pageable pageable = PageRequest.of(page, size);
            Page<Component> componentsPage = componentService.findAllFromTable(tableName, pageable);
            return ResponseEntity.ok(componentsPage);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar componentes: " + e.getMessage());
        }
    }

    /**
     * Endpoint para buscar todos os componentes com paginação (sem nome de tabela).
     *
     * @param page Número da página.
     * @param size Tamanho da página.
     * @return Lista paginada de componentes.
     */
    @GetMapping
    public ResponseEntity<?> getAllComponents(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Component> componentsPage = componentService.findAll(pageable);
            return ResponseEntity.ok(componentsPage);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar componentes: " + e.getMessage());
        }
    }

    /**
     * Endpoint para buscar os nomes das colunas de uma tabela específica.
     *
     * @param tableName Nome da tabela.
     * @return Lista com os nomes das colunas.
     */
    @GetMapping("/{tableName}/columns")
    public ResponseEntity<?> getTableColumns(@PathVariable String tableName) {
        if (!ALLOWED_TABLES.contains(tableName)) {
            return ResponseEntity.badRequest().body("Tabela não permitida: " + tableName);
        }

        try {
            List<String> columnNames = componentService.getColumnNames(tableName);
            return ResponseEntity.ok(columnNames);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar colunas: " + e.getMessage());
        }
    }

    /**
     * Endpoint para buscar um componente específico por tabela e ID.
     *
     * @param tableName Nome da tabela.
     * @param id ID do componente.
     * @return O componente especificado ou erro caso não encontrado.
     */
    @GetMapping("/{tableName}/{id}")
    public ResponseEntity<?> getComponentById(
        @PathVariable String tableName,
        @PathVariable String id
    ) {
        // Validar o nome da tabela
        if (!ALLOWED_TABLES.contains(tableName)) {
            return ResponseEntity.badRequest().body("Tabela não permitida: " + tableName);
        }

        try {
            // Buscar o componente pelo ID
            Component component = componentService.findByIdFromTable(tableName, id);
            if (component != null) {
                return ResponseEntity.ok(component);
            } else {
                return ResponseEntity.status(404).body("Componente não encontrado.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar o componente: " + e.getMessage());
        }
    }
}
