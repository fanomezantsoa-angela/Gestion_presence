package com.example.back.Service;

import com.example.back.DTO.LoginDTO;
import com.example.back.DTO.LoginResponseDTO;
import com.example.back.Entity.Role;
import com.example.back.Entity.User;
import com.example.back.Entity.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public AuthService(AuthenticationConfiguration config,
                       UserRepository userRepository) throws Exception {
        this.authenticationManager = config.getAuthenticationManager();
        this.userRepository = userRepository;
    }

    public LoginResponseDTO login(LoginDTO dto, HttpServletRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(auth);

        HttpSession session = request.getSession(true);

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<String> roles = user.getRoles()
                .stream()
                .map(Role::getName)
                .toList();

        return new LoginResponseDTO(
                user.getId(),
                user.getEmail(),
                roles,
                session.getId()
        );
    }
}

