package com.example.back.Service;

import com.example.back.DTO.*;
import com.example.back.Entity.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class SessionService {
    private final SessionRepository sessionRepository;
    private final StudentRepository studentRepository;
    private final CalendarRepository calendarRepository;

    public SessionService(SessionRepository sessionRepository, StudentRepository studentRepository, CalendarRepository calendarRepository){
        this.sessionRepository= sessionRepository;
        this.studentRepository=studentRepository;
        this.calendarRepository=calendarRepository;

    }
    public void addSession(SessionDTo dto){
       Session session = new Session(dto.getDate(),dto.getStart_time(),dto.getEnd_time(), dto.getCourse_title(), dto.getTeacher());
       sessionRepository.save(session);

    }
    public void editSession(SessionDTo dto, Long id){
        Session session =  sessionRepository.findById(id) .orElseThrow(() -> new RuntimeException("Session not found"));
        session.setDate(dto.getDate());
        session.setStart_time(dto.getStart_time());
        session.setEnd_time(dto.getEnd_time());
        session.setCourse_title(dto.getCourse_title());
        session.setTeacher(dto.getTeacher());



        sessionRepository.save(session);
    }
    public void deleteSession(Long id){
        Session session =  sessionRepository.findById(id) .orElseThrow(() -> new RuntimeException("Session not found"));
        sessionRepository.delete(session);

    }
    public List<ResponseSessionDTO> getAllSession(){
        Iterable<Session>    iterableSession =  sessionRepository.findAll();
        List<ResponseSessionDTO> sessions = new ArrayList<>();
        iterableSession.forEach(session->{
                    ResponseSessionDTO dtores= new ResponseSessionDTO(
                            session.getId(),
                            session.getDate(),
                            session.getStart_time(),
                            session.getEnd_time(),
                            session.getCourse_title(),
                            session.getTeacher()



                    );
                    sessions.add(dtores);

                }

        );
        return sessions;

    }
    @Transactional
    public List<FeuilleDTO> getStudentCurrentMonthFeuille(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Group group = student.getGroup();

        List<Calendar> calendars = calendarRepository.findByGroup(group);
        System.out.println("Student: " + student.getId());
        System.out.println("Group: " + student.getGroup());
        System.out.println("Calendars: " + calendars.size());
        calendars.forEach(cal ->
                System.out.println("Sessions dans cal: " + cal.getSessions().size())
        );
        LocalDate today = LocalDate.now();
        int currentMonth = today.getMonthValue();
        int currentYear = today.getYear();

        List<FeuilleDTO> feuille = new ArrayList<>();

        for (Calendar cal : calendars) {
            cal.getSessions().stream()
                    .filter(s -> s.getDate().getMonthValue() == currentMonth
                            && s.getDate().getYear() == currentYear)
                    .forEach(s -> {
                        FeuilleDTO dto = new FeuilleDTO(
                                student.getId(),
                                student.getUser().getFirstname(),
                                student.getUser().getLastname(),
                                s.getId(),
                                s.getDate(),
                                s.getStart_time(),
                                s.getEnd_time(),
                                s.getCourse_title(),
                                s.getTeacher()
                        );
                        feuille.add(dto);
                    });
        }

        return feuille;
    }

}
