package com.example.frontend.controller;

import com.example.frontend.model.User;
import com.example.frontend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {
    UserService userService;

    // No Annotation required for autowiring
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Endpoint
    // http://localhost:9090/api/user
    // GET + api/user
    @GetMapping(value = "user", produces = "application/json")
    public ResponseEntity<Iterable<User>> getAllUsers() {

        System.out.println("Inside getAllUsers");
        Iterable<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    // Endpoint
    // http://localhost:9090/api/user/1
    // GET + api/user/1
    @GetMapping(value = "user/{id}", produces = "application/json")
    public ResponseEntity<User> getUserById(@PathVariable long id) {

        System.out.println("Inside getAUserById");
        Optional<User> user = userService.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    // Endpoint
    // http://localhost:9090/api/user/
    // POST + api/user
    @PostMapping(value = "user", consumes = "application/json", produces = "application/json")
    public ResponseEntity<User> createUser(@RequestBody User user) {

        System.out.println("Inside createUser");
        user = userService.save(user);
        return ResponseEntity.ok(user);
    }

    // Endpoint
    // http://localhost:9090/api/user/1
    // DELETE + api/user/1
    @DeleteMapping(value = "user/{id}")
    public void deleteUser(@PathVariable long id) {

        System.out.println("Inside deleteUser");
        userService.deleteById(id);

    }




}
