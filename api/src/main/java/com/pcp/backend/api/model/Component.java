package com.pcp.backend.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import java.util.HashMap;
import java.util.Map;

@Entity
public class Component {

    @Id
    private Long id; // Presume-se que a tabela tenha um identificador único

    @Transient
    private Map<String, String> data = new HashMap<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Map<String, String> getData() {
        return data;
    }

    public void setData(Map<String, String> data) {
        this.data = data;
    }

    public void addData(String key, String value) {
        data.put(key, value);
    }

    @Override
    public String toString() {
        return "Component{" +
                "id=" + id +
                ", data=" + data +
                '}';
    }
}
