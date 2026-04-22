package com.example.back.DTO;

import java.util.List;

public class UserResponseDTO {
    private String email;
    private Long usedId;
    private String lastName;
    private String firstName;
    private List<String> roles;

    public Long getUsedId() {
        return usedId;
    }

    public String getEmail() {
        return email;
    }

    public UserResponseDTO(String email, Long usedId, String lastName, String firstName, List<String> roles) {
        this.email = email;
        this.usedId = usedId;
        this.lastName = lastName;
        this.firstName = firstName;
        this.roles = roles;
    }

    public String getLastName() {
        return lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public List<String> getRoles() {
        return roles;
    }
}
