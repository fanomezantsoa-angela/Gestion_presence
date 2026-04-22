package com.example.back.DTO;

import java.util.List;

public class GroupResponseDTO {

    private Long id;
    private String groupe_name;
    private List<ResponseStudentDTO> students;

    public GroupResponseDTO() {
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

    public List<ResponseStudentDTO> getStudents() {
        return students;
    }

    public void setStudents(List<ResponseStudentDTO> students) {
        this.students = students;
    }
}
