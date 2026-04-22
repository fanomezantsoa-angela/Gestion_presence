package com.example.back.DTO;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.time.LocalTime;

public class ResponseSessionDTO {
    private Long id_session;
    private LocalDate date;
    
    private LocalTime start_time;

    private LocalTime end_time;
 
    private String course_title;
    private String teacher;

    public Long getId_session() {
        return id_session;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getStart_time() {
        return start_time;
    }

    public LocalTime getEnd_time() {
        return end_time;
    }

    public String getCourse_title() {
        return course_title;
    }

    public String getTeacher() {
        return teacher;
    }

    public ResponseSessionDTO() {
    }

    public ResponseSessionDTO(Long id_session, LocalDate date, LocalTime start_time, LocalTime end_time, String course_title, String teacher) {
        this.id_session = id_session;
        this.date = date;
        this.start_time = start_time;
        this.end_time = end_time;
        this.course_title = course_title;
        this.teacher = teacher;
    }

    public void setCourse_title(String course_title) {
        this.course_title = course_title;
    }

    public void setId_session(Long id_session) {
        this.id_session = id_session;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setStart_time(LocalTime start_time) {
        this.start_time = start_time;
    }

    public void setEnd_time(LocalTime end_time) {
        this.end_time = end_time;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }
}
