package com.example.back.DTO;

import jakarta.validation.constraints.NotBlank;

public class RoleDTO {
    @NotBlank(message = "Rôle required")
    private String rolename;

    public RoleDTO(String rolename) {
        this.rolename = rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public String getRolename() {
        return rolename;
    }
}
