package com.pcp.backend.api.service;

import com.pcp.backend.api.model.Component;
import com.pcp.backend.api.repository.ComponentRepository;
import com.pcp.backend.api.util.CustomPageImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Service
public class ComponentService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ComponentRepository componentRepository;

    /**
     * Retorna a lista de todos os componentes com paginação.
     *
     * @param pageable Configuração de paginação.
     * @return Página de componentes.
     */
    public Page<Component> findAll(Pageable pageable) {
        return componentRepository.findAll(pageable);
    }

    /**
     * Retorna todos os componentes de uma tabela específica com paginação.
     *
     * @param tableName Nome da tabela.
     * @param pageable  Configuração de paginação.
     * @return Página de componentes.
     */
    public Page<Component> findAllFromTable(String tableName, Pageable pageable) {
        if (!isTableAllowed(tableName)) {
            throw new IllegalArgumentException("Tabela não permitida: " + tableName);
        }

        String query = "SELECT * FROM " + tableName;
        List<Object[]> resultList = entityManager
            .createNativeQuery(query)
            .setFirstResult((int) pageable.getOffset())
            .setMaxResults(pageable.getPageSize())
            .getResultList();

        List<String> columnNames = getColumnNames(tableName);

        List<Component> components = new ArrayList<>();

        for (Object[] row : resultList) {
            Component component = new Component();

            for (int i = 0; i < columnNames.size() && i < row.length; i++) {
                String value = row[i] != null ? row[i].toString() : "N/A";
                component.addData(columnNames.get(i), value);
            }

            components.add(component);
        }

        // Criação da página manualmente
        return new CustomPageImpl<>(components, pageable, countTableRows(tableName));
    }

    /**
     * Busca um componente específico em uma tabela pelo ID.
     *
     * @param tableName Nome da tabela.
     * @param id        ID do componente.
     * @return O componente encontrado ou null se não existir.
     */
    public Component findByIdFromTable(String tableName, String id) {
        if (!isTableAllowed(tableName)) {
            throw new IllegalArgumentException("Tabela não permitida: " + tableName);
        }

        // Busca a linha específica pelo ID
        String query = "SELECT * FROM " + tableName + " WHERE id = :id";
        List<Object[]> resultList = entityManager
            .createNativeQuery(query)
            .setParameter("id", id)
            .getResultList();

        if (resultList.isEmpty()) {
            return null; // Retorna null se nenhum resultado for encontrado
        }

        List<String> columnNames = getColumnNames(tableName);
        Object[] row = resultList.get(0); // Pega a primeira linha do resultado
        Component component = new Component();

        for (int i = 0; i < columnNames.size() && i < row.length; i++) {
            String value = row[i] != null ? row[i].toString() : "N/A";
            component.addData(columnNames.get(i), value);
        }

        return component;
    }

    /**
     * Retorna os nomes das colunas de uma tabela específica.
     *
     * @param tableName Nome da tabela.
     * @return Lista de nomes das colunas.
     */
    public List<String> getColumnNames(String tableName) {
        String sql = "SHOW COLUMNS FROM " + tableName;
        List<Object[]> columns = entityManager.createNativeQuery(sql).getResultList();
        List<String> columnNames = new ArrayList<>();
        for (Object[] column : columns) {
            columnNames.add(column[0].toString()); // O nome da coluna está no índice 0
        }
        return columnNames;
    }

    /**
     * Valida se o nome da tabela é permitido.
     *
     * @param tableName Nome da tabela.
     * @return True se a tabela for permitida; False caso contrário.
     */
    private boolean isTableAllowed(String tableName) {
        List<String> allowedTables = List.of(
            "cases_detailed",
            "cpu_coolers_detailed",
            "cpus_detailed",
            "gpus_detailed",
            "memory_detailed",
            "motherboards_detailed",
            "power_supplies_detailed",
            "storage_detailed"
        );
        return allowedTables.contains(tableName);
    }

    /**
     * Conta o número total de linhas em uma tabela específica.
     *
     * @param tableName Nome da tabela.
     * @return Número total de linhas.
     */
    private long countTableRows(String tableName) {
        String query = "SELECT COUNT(*) FROM " + tableName;
        Object result = entityManager.createNativeQuery(query).getSingleResult();
        return result != null ? Long.parseLong(result.toString()) : 0;
    }
}
