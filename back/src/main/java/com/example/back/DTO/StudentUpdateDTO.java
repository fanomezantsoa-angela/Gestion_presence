package com.example.back.DTO;

public class StudentUpdateDTO {
    private Long groupe_id;
    private Long numero;

    private String email;
    private String firstname;
    private String lastname;

    public StudentUpdateDTO() {
    }

    public Long getNumero() {
        return numero;
    }

    public void setNumero(Long numero) {
        this.numero = numero;
    }

    public Long getGroupe_id() {
        return groupe_id;
    }

    public void setGroupe_id(Long groupe_id) {
        this.groupe_id = groupe_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
}
