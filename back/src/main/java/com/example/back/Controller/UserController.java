package com.example.back.Controller;

import com.example.back.DTO.RegistrationUserDTO;
import com.example.back.DTO.UserResponseDTO;
import com.example.back.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService){
        this.userService=userService;
    }
    @PostMapping("/register")
    public String register(@Valid @RequestBody RegistrationUserDTO dto) {
        userService.register(dto);
        return "User created";
    }
    @PutMapping("/Edit/{id}")
    public String editUser(@PathVariable Long id, @Valid @RequestBody RegistrationUserDTO dto) {
        userService.userEdit(id,dto);
        return "User Edited";
    }
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.userDelete(id);
        return "User Deleted";
    }

    @GetMapping("/{id}")
    public UserResponseDTO UserGet(@PathVariable Long id){
        return userService.userDisplay(id);
    }
    @GetMapping("/All")
    public List<UserResponseDTO> UserGetAll(){
        return userService.getAllusers();
    }


}
