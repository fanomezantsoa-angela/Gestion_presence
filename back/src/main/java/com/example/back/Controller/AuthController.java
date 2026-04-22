package com.example.back.Controller;

import com.example.back.DTO.LoginDTO;
import com.example.back.DTO.LoginResponseDTO;
import com.example.back.Service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginDTO dto, HttpServletRequest request) {
        return authService.login(dto, request);
    }
}
