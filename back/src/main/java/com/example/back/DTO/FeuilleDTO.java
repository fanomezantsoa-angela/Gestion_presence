package com.example.back.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

public class FeuilleDTO {

    private Long studentId;
    private String studentFirstName;
    private String studentLastName;

    private Long idSession;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String courseTitle;
    private String teacher;

    public FeuilleDTO() {
    }

    public FeuilleDTO(Long studentId, String studentFirstName, String studentLastName,
                      Long idSession, LocalDate date, LocalTime startTime,
                      LocalTime endTime, String courseTitle, String teacher) {
        this.studentId = studentId;
        this.studentFirstName = studentFirstName;
        this.studentLastName = studentLastName;
        this.idSession = idSession;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.courseTitle = courseTitle;
        this.teacher = teacher;
    }

    // --- Getters & Setters ---

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentFirstName() {
        return studentFirstName;
    }

    public void setStudentFirstName(String studentFirstName) {
        this.studentFirstName = studentFirstName;
    }

    public String getStudentLastName() {
        return studentLastName;
    }

    public void setStudentLastName(String studentLastName) {
        this.studentLastName = studentLastName;
    }

    public Long getIdSession() {
        return idSession;
    }

    public void setIdSession(Long idSession) {
        this.idSession = idSession;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }
}