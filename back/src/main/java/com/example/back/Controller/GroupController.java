package com.example.back.Controller;

import com.example.back.DTO.GroupDTO;
import com.example.back.DTO.GroupResponseDTO;
import com.example.back.DTO.ResponseStudentDTO;
import com.example.back.DTO.StudentDTO;
import com.example.back.Entity.Group;
import com.example.back.Service.GroupService;
import com.example.back.Service.StudentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Group")
public class GroupController {
    private final GroupService groupService;
    public GroupController(GroupService groupService){
        this.groupService=groupService;
    }
    @PostMapping("/create")
    public String addGroup(@Valid @RequestBody GroupDTO dto) {
        groupService.createGroup(dto);
        return "Group Added";
    }
    @PutMapping("/Edit/{id}")
    public String editGroup(@PathVariable Long id, @Valid @RequestBody GroupDTO dto) {
        groupService.editGroup(dto, id);
        return "Group Edited";
    }
    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable Long id) {
        groupService.deleteGroup(id);
        return "Group Deleted";
    }
    @GetMapping("/All")
    public List<GroupResponseDTO> getAllRole(){
        return groupService.getAllGroups();
    }
}
