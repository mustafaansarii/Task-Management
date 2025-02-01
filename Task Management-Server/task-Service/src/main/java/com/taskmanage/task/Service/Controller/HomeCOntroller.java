package com.taskmanage.task.Service.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeCOntroller {

    @GetMapping("/task")
    public ResponseEntity<String> home(){
        return new ResponseEntity<>("Welcome to Task Management", org.springframework.http.HttpStatus.OK);
    }
}
