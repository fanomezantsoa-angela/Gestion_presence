package com.example.back.Service;

import com.example.back.DTO.RoleAssignDTO;
import com.example.back.DTO.RoleDTO;
import com.example.back.Entity.Role;
import com.example.back.Entity.RoleRepository;
import com.example.back.Entity.User;
import com.example.back.Entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    @Autowired
    public RoleService(UserRepository userRepository,
                       RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    public void assignRoleToUser( RoleAssignDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail()) .orElseThrow(() -> new RuntimeException("User not found"));

         String raw = dto.getRoleName().trim().toUpperCase();
         String upperName = raw.startsWith("ROLE_") ? raw : "ROLE_" + raw;
         Role role = roleRepository.findByName(upperName)
                 .orElseGet(() -> roleRepository.save(new Role(upperName)));;
            System.out.println("assign");
         user.getRoles().add(role);
         userRepository.save(user);
    }
    public void createRole( RoleDTO dto){
        String raw = dto.getRolename().trim().toUpperCase();
        String upperName = raw.startsWith("ROLE_") ? raw : "ROLE_" + raw;
        roleRepository.save(new Role(upperName));

    }
    public void deleteRole (Long id){
        Role role = roleRepository.findById(id) .orElseThrow(() -> new RuntimeException("Role not found"));
        roleRepository.delete(role);

    }
    public void editRole(RoleDTO dto, Long id){
        Role role = roleRepository.findById(id) .orElseThrow(() -> new RuntimeException("Role not found"));
        role.setName(dto.getRolename());
        roleRepository.save(role);


    }
    public List<Role> getAllroles(){
        Iterable<Role> rolesIterable = roleRepository.findAll();
        List<Role> roles = new ArrayList<>();
        rolesIterable.forEach(roles::add);
        return roles;

    }
}




