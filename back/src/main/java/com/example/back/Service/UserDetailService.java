package com.example.back.Service;

import com.example.back.Entity.User;
import com.example.back.Entity.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements org.springframework.security.core.userdetails.UserDetailsService{
    private final UserRepository userRepository;
    public UserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String email) {
        User user = userRepository.findByEmail(email) .orElseThrow(() -> new RuntimeException("User not found"));
        var authorities = user.getRoles().stream() .map(role -> new org.springframework.security.core.authority.SimpleGrantedAuthority(role.getName())) .toList();
        return new org.springframework.security.core.userdetails.User( user.getEmail(), user.getPassword(), authorities );
    }
}
