package com.example.back.Service;

import com.example.back.DTO.ResponseStudentDTO;
import com.example.back.DTO.StudentDTO;
import com.example.back.DTO.StudentUpdateDTO;
import com.example.back.Entity.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class StudentService {

    private final StudentRepository studentRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public StudentService(StudentRepository studentRepository,
                          GroupRepository groupRepository,
                          UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    public void addStudent(StudentDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Group group = groupRepository.findById(dto.getGroupe_id())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        Student student = new Student();
        student.setUser(user);
        student.setNumero(dto.getNumero());
        student.setGroup(group);
        studentRepository.save(student);
    }

    public void editStudent(StudentUpdateDTO dto, Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Group group = groupRepository.findById(dto.getGroupe_id())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        User user = student.getUser();


        student.setNumero(dto.getNumero());
        student.setGroup(group);

        // User
        user.setEmail(dto.getEmail());
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());

        studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        studentRepository.delete(student);
    }

    public List<ResponseStudentDTO> getAllStudent() {
        List<ResponseStudentDTO> students = new ArrayList<>();
        studentRepository.findAll().forEach(student -> {
            User user = student.getUser();
            students.add(new ResponseStudentDTO(
                    student.getId(),
                    student.getNumero(),
                    user.getEmail(),
                    user.getFirstname(),
                    user.getLastname(),
                    student.getGroup().getId(),
                    student.getGroup().getGroupe_name()
            ));
        });
        return students;
    }

    public void assignGroup(Long group_id, Long student_id) {
        Student student = studentRepository.findById(student_id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Group group = groupRepository.findById(group_id)
                .orElseThrow(() -> new RuntimeException("Group not found"));
        student.setGroup(group);
        studentRepository.save(student);
    }
}