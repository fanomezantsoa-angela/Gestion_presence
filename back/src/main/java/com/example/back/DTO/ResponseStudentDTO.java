package com.example.back.DTO;

public class ResponseStudentDTO {
    private Long student_id;
    private Long numeroStudent;
    private String email;
    private String firstname;
    private String lastname;
    private Long group_id;
    private String group_name;

    // Constructeur vide pour GroupService (qui utilise les setters)
    public ResponseStudentDTO() {}

    // Constructeur complet pour StudentService
    public ResponseStudentDTO(Long student_id, Long numeroStudent, String email,
                              String firstname, String lastname,
                              Long group_id, String group_name) {
        this.student_id = student_id;
        this.numeroStudent = numeroStudent;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.group_id = group_id;
        this.group_name = group_name;
    }

    public Long getStudent_id() { return student_id; }
    public void setStudent_id(Long student_id) { this.student_id = student_id; }

    public Long getNumeroStudent() { return numeroStudent; }
    public void setNumeroStudent(Long numeroStudent) { this.numeroStudent = numeroStudent; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public Long getGroup_id() { return group_id; }
    public void setGroup_id(Long group_id) { this.group_id = group_id; }

    public String getGroup_name() { return group_name; }
    public void setGroup_name(String group_name) { this.group_name = group_name; }
}