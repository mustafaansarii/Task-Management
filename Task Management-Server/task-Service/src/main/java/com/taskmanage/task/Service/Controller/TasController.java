package com.taskmanage.task.Service.Controller;

import com.taskmanage.task.Service.Model.Task;
import com.taskmanage.task.Service.Model.TaskStatus;
import com.taskmanage.task.Service.Model.UserDTO;
import com.taskmanage.task.Service.Service.TaskService;
import com.taskmanage.task.Service.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tasks")
public class TasController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task,
                                           @RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO user = userService.getUserProfile(jwt);
        Task createdTask = taskService.createTask(task, user.getRole());
        return ResponseEntity.ok(createdTask);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskbyid(@PathVariable Long id,
                                            @RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO user = userService.getUserProfile(jwt);
        Task task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    // Change @RequestBody to @RequestParam for 'status' in GET /api/tasks/user
    @GetMapping("/user")
    public ResponseEntity<List<Task>> getAssignedUserTask(@RequestParam(value = "status", required = false) TaskStatus status,
                                                          @RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO user = userService.getUserProfile(jwt);
        List<Task> tasks = taskService.assignedUserTask(user.getId(), status);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    // Change @RequestParam for 'status' in GET /api/tasks
    @GetMapping()
    public ResponseEntity<List<Task>> getALLTask(@RequestParam(value = "status", required = false) TaskStatus status,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO user = userService.getUserProfile(jwt);
        List<Task> tasks = taskService.getAllTask(status);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/{id}/user/{userid}/assigned")
    public ResponseEntity<Task> AssignTaskToUser(@PathVariable Long id,
                                                 @PathVariable Long userid,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO user = userService.getUserProfile(jwt);
        Task task = taskService.assignedToUser(userid, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> UpdateTask(@PathVariable Long id,
                                           @RequestBody Task req,
                                           @RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO user = userService.getUserProfile(jwt);
        Task tasks = taskService.updateTask(id, req, user.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Task> CompleteTask(@PathVariable Long id) throws Exception {
        Task tasks = taskService.completeTask(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> DeleteTask(@PathVariable Long id) throws Exception {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
