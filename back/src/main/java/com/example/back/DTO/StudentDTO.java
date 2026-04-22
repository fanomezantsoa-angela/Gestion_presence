package com.example.back.DTO;

public class StudentDTO {
    private Long userId;
    private Long numero;
    private Long groupe_id;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getNumero() { return numero; }
    public void setNumero(Long numero) { this.numero = numero; }

    public Long getGroupe_id() { return groupe_id; }
    public void setGroupe_id(Long groupe_id) { this.groupe_id = groupe_id; }
}