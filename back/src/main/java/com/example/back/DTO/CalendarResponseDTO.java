package com.example.back.DTO;

import com.example.back.Entity.Session;

import java.util.List;

public class CalendarResponseDTO {
    private  Long id;
    private String name_calendar;
    private Long group_id;
    private List<ResponseSessionDTO> sessions;

    public List<ResponseSessionDTO> getSessions() {
        return sessions;
    }

    public void setSessions(List<ResponseSessionDTO> sessions) {
        this.sessions = sessions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CalendarResponseDTO() {
    }

    public String getName_calendar() {
        return name_calendar;
    }

    public Long getGroup_id() {
        return group_id;
    }



    public void setName_calendar(String name_calendar) {
        this.name_calendar = name_calendar;
    }

    public void setGroup_id(Long group_id) {
        this.group_id = group_id;
    }

    public CalendarResponseDTO(Long id, String name_calendar, Long group_id, List<ResponseSessionDTO> sessions) {
        this.id = id;
        this.name_calendar = name_calendar;
        this.group_id = group_id;
        this.sessions = sessions;
    }
}
