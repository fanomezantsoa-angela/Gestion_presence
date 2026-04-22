package com.example.back.Entity;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
     boolean existsByEmail(String email);
     Optional <User> findById(Long id);

    @Override
    Iterable<User> findAll();
}
