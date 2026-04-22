package com.example.back.Entity;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CalendarRepository extends CrudRepository<Calendar, Long> {
    List<Calendar> findByGroup(Group group);
}
