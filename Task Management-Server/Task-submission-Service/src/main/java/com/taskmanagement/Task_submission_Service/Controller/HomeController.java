package com.taskmanagement.Task_submission_Service.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/home")
    public ResponseEntity<String> homeController(){
        return ResponseEntity.ok("Welcome to Task Submission Service");
    }
}
