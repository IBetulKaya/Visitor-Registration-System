package com.example.frontend.controller;

import com.example.frontend.model.Tourist;
import com.example.frontend.model.User;
import com.example.frontend.service.TouristService;
import com.example.frontend.service.TouristServiceImpl;
import com.example.frontend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TouristController {
    TouristService touristService;

    public TouristController(TouristService touristService) {
        this.touristService = touristService;
    }

    @GetMapping(value = "tourist", produces = "application/json")
    public ResponseEntity<Iterable<Tourist>> getAllTourists() {
        System.out.println("Inside getAllTourists");
        Iterable<Tourist> tourists = touristService.findAll();
        return ResponseEntity.ok(tourists);
    }

    @GetMapping(value = "tourist/{id}", produces = "application/json")
    public ResponseEntity<Tourist> getTouristById(@PathVariable long id) {

        System.out.println("Inside getTouristById");
        Optional<Tourist> tourist = touristService.findById(id);
        if (tourist.isPresent()) {
            return ResponseEntity.ok(tourist.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping(value = "tourist", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Tourist> createTourist(@RequestBody Tourist tourist) {

        System.out.println("Inside createTourist");
        tourist = touristService.save(tourist);
        return ResponseEntity.ok(tourist);
    }

    @DeleteMapping(value = "tourist/{id}")
    public void deleteTourist(@PathVariable long id) {

        System.out.println("Inside deleteTourist");
        touristService.deleteById(id);

    }


}
