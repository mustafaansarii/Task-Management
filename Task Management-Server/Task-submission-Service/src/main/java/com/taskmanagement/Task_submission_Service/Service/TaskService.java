package com.taskmanagement.Task_submission_Service.Service;

import com.taskmanagement.Task_submission_Service.Model.TaskDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "TASK-SERVICE", url = "${TaskServiceURL}")
public interface TaskService {

    @GetMapping("api/tasks/{id}")
    TaskDTO getTaskById(
            @PathVariable("id") Long id,
            @RequestHeader("Authorization") String jwt);

    @PutMapping("api/tasks/{id}/complete")
    TaskDTO completeTask(@PathVariable("id") Long id);
}
