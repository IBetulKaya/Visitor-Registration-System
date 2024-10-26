package com.example.frontend.service;

import com.example.frontend.model.Tourist;
import java.util.Optional;

public interface TouristService {
    Iterable<Tourist> findAll();
    Optional<Tourist> findById(long id);
    Tourist save(Tourist tourist);
    void deleteById( long id);
}
