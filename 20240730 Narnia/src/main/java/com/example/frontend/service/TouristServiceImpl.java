package com.example.frontend.service;

import com.example.frontend.Repository.TouristRepository;
import com.example.frontend.model.Tourist;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class TouristServiceImpl implements TouristService{
    TouristRepository touristRepository;

    public TouristServiceImpl( TouristRepository touristRepository){
        this.touristRepository = touristRepository;
    }

    @Override
    public Iterable<Tourist> findAll() {
        return touristRepository.findAll();
    }

    @Override
    public Optional<Tourist> findById(long id) {
        return touristRepository.findById(id);
    }

    @Override
    public Tourist save(Tourist tourist) {
        if( tourist.getId() == 0){
            System.out.println("Creating user");
        }else{
            System.out.println("updating user");
        }
        return touristRepository.save(tourist);
    }

    @Override
    public void deleteById(long id) {
        touristRepository.deleteById( id);
    }
}
