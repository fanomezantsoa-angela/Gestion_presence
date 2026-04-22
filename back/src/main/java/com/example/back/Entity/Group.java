package com.example.back.Entity;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String groupe_name;
    @OneToMany(mappedBy="group", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Student> students;
    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<Calendar> calendars;
    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public List<Calendar> getCalendars() {
        return calendars;
    }

    public void setCalendars(List<Calendar> calendars) {
        this.calendars = calendars;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGroupe_name() {
        return groupe_name;
    }

    public void setGroupe_name(String groupe_name) {
        this.groupe_name = groupe_name;
    }

    public Group() {
    }

    public Group(String groupe_name) {
        this.groupe_name = groupe_name;
    }
}
