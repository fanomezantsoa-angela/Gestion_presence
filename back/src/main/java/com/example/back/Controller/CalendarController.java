package com.example.back.Controller;

import com.example.back.DTO.*;
import com.example.back.Service.CalendarService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Calendar")
public class CalendarController {
    private final CalendarService calendarService;
    public  CalendarController(CalendarService calendarService){
        this.calendarService=calendarService;
    }
    @PostMapping("/create")
    public String createCalendar(@Valid @RequestBody CalendarDTO dto) {
      calendarService.createCalendar(dto);
        return "Calendar created";
    }
    @PostMapping("/{calendarId}/sessions")
    public String addSessions(
            @PathVariable Long calendarId,
            @RequestBody List<SessionDTo> sessions
    ) {
        calendarService.addSessions(calendarId, sessions);
        return ("Sessions added");
    }
    @GetMapping("/calendars")
    public List<CalendarResponseDTO> getCalendars(){
        return calendarService.viewAgenda();
    }


}
