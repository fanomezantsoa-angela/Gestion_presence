package com.example.back.Service;

import com.example.back.DTO.RegistrationUserDTO;
import com.example.back.DTO.UserResponseDTO;
import com.example.back.Entity.Role;
import com.example.back.Entity.RoleRepository;
import com.example.back.Entity.User;
import com.example.back.Entity.UserRepository;
import com.example.back.Utils.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }
    public User register(RegistrationUserDTO regisdto) {
      if (userRepository.existsByEmail(regisdto.getEmail())) {
            throw new RuntimeException("Email already used");
        }

    User user = userMapper.toEntity(regisdto);
    user.setPassword(passwordEncoder.encode("12345678"));
    return userRepository.save(user);
}
public User userEdit(Long iduser, RegistrationUserDTO regisdto){
        User user = userRepository.findById(iduser)
        .orElseThrow(() -> new RuntimeException("User not found"));
        user.setFirstname(regisdto.getFirstname());
        user.setLastname(regisdto.getLastname());
        user.setEmail(regisdto.getEmail());
        return userRepository.save(user);

}

public String userDelete(Long idUser){
    User user = userRepository.findById(idUser)
            .orElseThrow(() -> new RuntimeException("User not found"));
    userRepository.delete(user);
    return "User deleted";


}
public UserResponseDTO userDisplay (Long idUser){
        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("User not found"));
    List<String> roles = user.getRoles()
            .stream()
            .map(Role::getName)
            .toList();
        return new UserResponseDTO(
                user.getEmail(),
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                roles
        );
    }
   public List<UserResponseDTO> getAllusers(){
        Iterable<User> userIterable = userRepository.findAll();
        List<User> userList = new ArrayList<>();
        userIterable.forEach(userList::add);
        List <UserResponseDTO> responseDTOS = userList.stream()
                .map(user -> {
                    UserResponseDTO responseDto = new UserResponseDTO(
                            user.getEmail(),
                            user.getId(),
                            user.getFirstname(),
                            user.getLastname(),
                            user.getRoles()
                                    .stream()
                                    .map(Role::getName)
                                    .toList()
                    );
                            return responseDto;
                })
                .toList();
        return responseDTOS;



   }




}
