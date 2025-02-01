package com.taskmanagement.Service;

import com.taskmanagement.Config.JwtProvider;
import com.taskmanagement.Model.User;
import com.taskmanagement.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceIMPL extends UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserProfile(String jwt) {
        // Extract email from JWT using JwtProvider
        String email = JwtProvider.getEmailFromJwtToken(jwt);

        // Fetch user profile by email
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
