package com.example.back.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {
    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private Long numero;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    public Student() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Long getNumero() { return numero; }
    public void setNumero(Long numero) { this.numero = numero; }

    public Group getGroup() { return group; }
    public void setGroup(Group group) { this.group = group; }
}