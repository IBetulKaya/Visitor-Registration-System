package com.example.frontend.service;

import com.example.frontend.model.User;

import java.util.Optional;

public interface UserService {
    Iterable<User> findAll();
    Optional<User> findById(long id);
    User save(User user);
    void deleteById( long id);
}
