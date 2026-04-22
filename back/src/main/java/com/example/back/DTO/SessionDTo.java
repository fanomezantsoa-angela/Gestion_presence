package com.example.back.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public class SessionDTo {

    @NotNull(message = "date required")
    private LocalDate date;
    @NotNull(message = "start time required")
    private LocalTime start_time;
    @NotNull(message = "end time required")
    private LocalTime end_time;
    @NotBlank(message = "course title required")
    private String course_title;
    @NotBlank(message = "teacher required")
    private String teacher;

    public SessionDTo(LocalDate date, LocalTime start_time, LocalTime end_time, String course_title, String teacher) {
        this.date = date;
        this.start_time = start_time;
        this.end_time = end_time;
        this.course_title = course_title;
        this.teacher = teacher;
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
}
