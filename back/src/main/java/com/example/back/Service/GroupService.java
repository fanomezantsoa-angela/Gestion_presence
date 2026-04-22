package com.example.back.Service;

import com.example.back.DTO.GroupDTO;
import com.example.back.DTO.GroupResponseDTO;
import com.example.back.DTO.ResponseStudentDTO;
import com.example.back.DTO.RoleDTO;
import com.example.back.Entity.Group;
import com.example.back.Entity.GroupRepository;
import com.example.back.Entity.Role;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupService {
    final GroupRepository groupRepository;
    public GroupService(GroupRepository groupRepository){
        this.groupRepository= groupRepository;
    }
    public void createGroup( GroupDTO dto){

        groupRepository.save(new Group(dto.getGroupname()));

    }
    public void deleteGroup (Long id){
        Group group = groupRepository.findById(id) .orElseThrow(() -> new RuntimeException("Group not found"));
        groupRepository.delete(group);

    }
    public void editGroup(GroupDTO dto, Long id){
        Group group = groupRepository.findById(id) .orElseThrow(() -> new RuntimeException("Group not found"));
        group.setGroupe_name(dto.getGroupname());
        groupRepository.save(group);


    }
    public List<GroupResponseDTO> getAllGroups() {
        List<Group> groups = new ArrayList<>();
        groupRepository.findAll().forEach(groups::add); // convert Iterable → List

        return groups.stream()
                .map(group -> {
                    GroupResponseDTO dto = new GroupResponseDTO();
                    dto.setId(group.getId());
                    dto.setGroupe_name(group.getGroupe_name());

                    List<ResponseStudentDTO> students = group.getStudents()
                            .stream()
                            .map(student -> {
                                ResponseStudentDTO sDto = new ResponseStudentDTO();
                                sDto.setStudent_id(student.getId());
                                sDto.setNumeroStudent(student.getNumero());
                                sDto.setFirstname(student.getUser().getFirstname());   // ← getUser()
                                sDto.setLastname(student.getUser().getLastname());     // ← getUser()
                                sDto.setEmail(student.getUser().getEmail());           // ← getUser()
                                sDto.setGroup_id(group.getId());
                                sDto.setGroup_name(group.getGroupe_name());
                                return sDto;
                            })
                            .toList();

                    dto.setStudents(students);

                    return dto;
                })
                .toList();
    }

}
