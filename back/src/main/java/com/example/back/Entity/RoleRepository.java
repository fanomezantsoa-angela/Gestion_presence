package com.example.back.Entity;


import org.springframework.data.repository.CrudRepository;

import java.util.Iterator;
import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Optional<Role> findByName(String name);
    Optional<Role> findById(Long id);
    Iterable<Role> findAll();

}
