package com.example.frontend.Repository;

import com.example.frontend.model.Tourist;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TouristRepository extends CrudRepository<Tourist, Long> {
}
