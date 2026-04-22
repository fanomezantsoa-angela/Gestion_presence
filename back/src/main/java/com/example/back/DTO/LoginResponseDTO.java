package com.example.back.DTO;

import java.util.List;

public class LoginResponseDTO {
    private Long userId;
    private String email;
    private List<String> roles;
    private String sessionId;
    public LoginResponseDTO(Long userId, String email, List<String> roles, String sessionId) {
        this.userId = userId;
        this.email = email;
        this.roles = roles;
        this.sessionId = sessionId;

    }

    public String getSessionId() {
        return sessionId;
    }

    public List<String> getRoles() {
        return roles;
    }

    public Long getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }
}
