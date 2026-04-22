package com.example.back.Entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="calendars")
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany(
            mappedBy = "calendar",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,   // 🔥 ADD THIS
            orphanRemoval = true
    )
    private List<Session> sessions = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Calendar() {
    }
    public void addSession(Session session) {
        sessions.add(session);
        session.setCalendar(this);
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Session> getSessions() {
        return sessions;
    }

    public void setSessions(List<Session> sessions) {
        this.sessions = sessions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Calendar(String name) {
        this.name = name;
    }
}
