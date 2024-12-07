package com.pcp.backend.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "build") // Nome da tabela no banco de dados
public class Build {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nome;

    @Column(name = "processador")
    private String processador;

    @Column(name = "cooler")
    private String cooler;

    @Column(name = "placa_mae")
    private String placaMae;

    @Column(name = "gpu")
    private String gpu;

    @Column(name = "ram")
    private String ram;

    @Column(name = "armazenamento")
    private String armazenamento;

    @Column(name = "fonte")
    private String fonte;

    @Column(name = "gabinete")
    private String gabinete;

    @Column(name = "system_user_id", nullable = false)
    private int systemUserId;

    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm = LocalDateTime.now();

    @Column(name = "atualizado_em")
    private LocalDateTime atualizadoEm = LocalDateTime.now();

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getProcessador() {
		return processador;
	}

	public void setProcessador(String processador) {
		this.processador = processador;
	}

	public String getCooler() {
		return cooler;
	}

	public void setCooler(String cooler) {
		this.cooler = cooler;
	}

	public String getPlacaMae() {
		return placaMae;
	}

	public void setPlacaMae(String placaMae) {
		this.placaMae = placaMae;
	}

	public String getGpu() {
		return gpu;
	}

	public void setGpu(String gpu) {
		this.gpu = gpu;
	}

	public String getRam() {
		return ram;
	}

	public void setRam(String ram) {
		this.ram = ram;
	}

	public String getArmazenamento() {
		return armazenamento;
	}

	public void setArmazenamento(String armazenamento) {
		this.armazenamento = armazenamento;
	}

	public String getFonte() {
		return fonte;
	}

	public void setFonte(String fonte) {
		this.fonte = fonte;
	}

	public String getGabinete() {
		return gabinete;
	}

	public void setGabinete(String gabinete) {
		this.gabinete = gabinete;
	}

	public int getSystemUserId() {
		return systemUserId;
	}

	public void setSystemUserId(int systemUserId) {
		this.systemUserId = systemUserId;
	}

	public LocalDateTime getCriadoEm() {
		return criadoEm;
	}

	public void setCriadoEm(LocalDateTime criadoEm) {
		this.criadoEm = criadoEm;
	}

	public LocalDateTime getAtualizadoEm() {
		return atualizadoEm;
	}

	public void setAtualizadoEm(LocalDateTime atualizadoEm) {
		this.atualizadoEm = atualizadoEm;
	}

   
}

