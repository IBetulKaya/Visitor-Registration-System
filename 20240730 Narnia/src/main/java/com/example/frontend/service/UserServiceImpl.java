package com.example.frontend.service;

import com.example.frontend.Repository.UserRepository;
import com.example.frontend.model.User;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    UserRepository userRepository;

    // No annotation required for autowiring
    public UserServiceImpl( UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public Iterable<User> findAll(){
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(long id) {
        return userRepository.findById( id);
    }

    @Override
    public User save(User user){

        if( user.getId() == 0){
            System.out.println("Creating user");
        }else{
            System.out.println("updating user");
        }
        return userRepository.save( user);
    }

    @Override
    public void deleteById( long id) {
        userRepository.deleteById( id);
    }
}
