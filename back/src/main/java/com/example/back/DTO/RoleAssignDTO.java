package com.example.back.DTO;

import jakarta.validation.constraints.NotBlank;

public class RoleAssignDTO {
    @NotBlank(message = "Rôle required")
    private String roleName;
    @NotBlank(message = "Email required")
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
