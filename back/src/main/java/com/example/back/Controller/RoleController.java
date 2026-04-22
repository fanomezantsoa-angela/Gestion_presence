package com.example.back.Controller;

import com.example.back.DTO.RegistrationUserDTO;
import com.example.back.DTO.RoleAssignDTO;
import com.example.back.DTO.RoleDTO;
import com.example.back.DTO.UserResponseDTO;
import com.example.back.Entity.Role;
import com.example.back.Service.RoleService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/role")
public class RoleController {
    RoleService roleService;
    public RoleController(RoleService roleService){
        this.roleService=roleService;
    }

    @PostMapping("/assign-role")
    public String assignRole(@RequestBody RoleAssignDTO dto) {
        roleService.assignRoleToUser(dto);
        return "Role assigned";
    }
    @PostMapping("/create")
    public String createRole(@Valid @RequestBody RoleDTO dto) {
        roleService.createRole(dto);
        return "Role created";
    }
    @PutMapping("/Edit/{id}")
    public String editRole(@PathVariable Long id, @Valid @RequestBody RoleDTO dto) {
       roleService.editRole(dto, id);
        return "Role Edited";
    }
    @DeleteMapping("/delete/{id}")
    public String deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return "Role Deleted";
    }
    @GetMapping("/All")
    public List<Role> getAllRole(){
        return roleService.getAllroles();
    }
}
