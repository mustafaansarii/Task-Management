package com.taskmanagement.Task_submission_Service.Service;

import com.taskmanagement.Task_submission_Service.Model.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;


@FeignClient(name = "USER-SERVICE", url = "${userServiceURL}")
public interface UserService {
    @GetMapping("/api/user/profile")
    public UserDTO getUserProfile(@RequestHeader("Authorization") String jwt);
}
