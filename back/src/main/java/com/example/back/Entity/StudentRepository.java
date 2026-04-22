package com.example.back.Entity;

import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface StudentRepository extends CrudRepository<Student, Long> {
    Optional<Student> findByUserId(Long userId);
}