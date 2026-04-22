package com.example.back.Service;

import com.example.back.DTO.*;
import com.example.back.Entity.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class CalendarService {
private final CalendarRepository calendarRepository;
private final GroupRepository groupRepository;
public CalendarService(CalendarRepository calendarRepository, GroupRepository groupRepository){
    this.calendarRepository= calendarRepository;
    this.groupRepository= groupRepository;
}
    public void createCalendar(CalendarDTO dto){
        Calendar calendar = new Calendar(dto.getName());
        Group group = groupRepository.findById(dto.getGroup_id())
                .orElseThrow();
        calendar.setGroup(group);
        calendarRepository.save(calendar);

    }
    @Transactional
    public void addSessions(Long calendar_id, List<SessionDTo> sessionsDto){

        Calendar calendar = calendarRepository.findById(calendar_id)
                .orElseThrow(() -> new RuntimeException("Calendar not found"));

        for(SessionDTo dto: sessionsDto){
            Session session = new Session(
                    dto.getDate(),
                    dto.getStart_time(),
                    dto.getEnd_time(),
                    dto.getCourse_title(),
                    dto.getTeacher()
            );

            calendar.addSession(session);
        }

        calendarRepository.save(calendar);
    }
    public List<CalendarResponseDTO> viewAgenda() {

        List<Calendar> calendars = StreamSupport.stream(calendarRepository.findAll().spliterator(), false)
                .toList();

        return calendars.stream()
                .map(calendar -> {
                    CalendarResponseDTO dto = new CalendarResponseDTO();
                    dto.setId(calendar.getId());
                    dto.setName_calendar(calendar.getName());

                    // null-safe group info
                    if (calendar.getGroup() != null) {
                        dto.setGroup_id(calendar.getGroup().getId());

                    }

                    // map sessions
                    List<ResponseSessionDTO> sessions = calendar.getSessions()
                            .stream()
                            .map(session -> {
                                ResponseSessionDTO sessDto = new ResponseSessionDTO();
                                sessDto.setId_session(session.getId());
                                sessDto.setDate(session.getDate());
                                sessDto.setStart_time(session.getStart_time());
                                sessDto.setEnd_time(session.getEnd_time());
                                sessDto.setCourse_title(session.getCourse_title());
                                sessDto.setTeacher(session.getTeacher());
                                return sessDto;
                            })
                            .toList();

                    dto.setSessions(sessions);
                    return dto;
                })
                .toList();
    }

}


