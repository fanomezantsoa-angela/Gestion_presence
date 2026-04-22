package com.example.back.Controller;

import com.example.back.DTO.ResponseStudentDTO;
import com.example.back.DTO.RoleDTO;
import com.example.back.DTO.StudentDTO;
import com.example.back.DTO.StudentUpdateDTO;
import com.example.back.Entity.Role;
import com.example.back.Service.StudentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    private final StudentService studentService;
    public StudentController(StudentService studentService){
        this.studentService=studentService;
    }
    @PostMapping("/create")
    public String addStudent(@Valid @RequestBody StudentDTO dto) {
        studentService.addStudent(dto);
        return "Student Added";
    }
    @PutMapping("/Edit/{id}")
    public String editStudent(@PathVariable Long id, @Valid @RequestBody StudentUpdateDTO dto) {
        studentService.editStudent(dto, id);
        return "Student Edited";
    }
    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return "Student Deleted";
    }
    @GetMapping("/All")
    public List<ResponseStudentDTO> getAllStudents(){
        return studentService.getAllStudent();
    }
    @PutMapping("/GroupAssign")
    public String groupAssign(@Valid @RequestBody Long id_group, @Valid @RequestBody Long id_stu) {
        studentService.assignGroup(id_group, id_stu);
        return "Student's group assigned";
    }

}
