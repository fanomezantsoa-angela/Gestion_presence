package com.example.back.Controller;

import com.example.back.DTO.*;
import com.example.back.Service.SessionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/session")
public class SessionController {
    private final SessionService sessionService;
    public SessionController(SessionService sessionService){
        this.sessionService=sessionService;
    }
    @PostMapping("/create")
    public String addSession(@Valid @RequestBody SessionDTo dto) {
        sessionService.addSession(dto);
        return "Session Added";
    }
    @PutMapping("/Edit/{id}")
    public String editSession(@PathVariable Long id, @Valid @RequestBody SessionDTo dto) {
        sessionService.editSession(dto, id);
        return "Session Edited";
    }
    @DeleteMapping("/delete/{id}")
    public String deleteSession(@PathVariable Long id) {
        sessionService.deleteSession(id);
        return "Session Deleted";
    }
    @GetMapping("/All")
    public List<ResponseSessionDTO> getAllSessions(){
        return sessionService.getAllSession();
    }
    @GetMapping("/sessionMonth/{studentId}")
    public List<FeuilleDTO> sessionMonth(@PathVariable Long studentId){
        return sessionService.getStudentCurrentMonthFeuille(studentId);
    }



}
