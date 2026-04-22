package com.example.back.Utils;

import com.example.back.DTO.RegistrationUserDTO;
import com.example.back.Entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toEntity(RegistrationUserDTO regisDto){
        User user = new User();
        user.setFirstname(regisDto.getFirstname());
        user.setLastname(regisDto.getLastname());
        user.setEmail(regisDto.getEmail());
        return user;

    }
}
