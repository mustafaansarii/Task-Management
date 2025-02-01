package com.taskmanagement.Task_submission_Service.Controller;

import com.taskmanagement.Task_submission_Service.Model.Submission;
import com.taskmanagement.Task_submission_Service.Model.UserDTO;
import com.taskmanagement.Task_submission_Service.Service.SubmissionService;
import com.taskmanagement.Task_submission_Service.Service.TaskService;
import com.taskmanagement.Task_submission_Service.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submission")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Submission> submitTask(@RequestParam Long taskId,
                                                 @RequestParam String githubLink,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO user = userService.getUserProfile(jwt);
        Submission submitTask = submissionService.submitTask(taskId, githubLink, user.getId(), jwt);
        return new ResponseEntity<>(submitTask, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Submission> getSubmissionById(@PathVariable Long id,
                                                        @RequestHeader("Authorization") String jwt) throws Exception {
        userService.getUserProfile(jwt);
        Submission submission = submissionService.getSubmissionById(id);
        return new ResponseEntity<>(submission, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Submission>> getAllSubmissions(@RequestHeader("Authorization") String jwt) throws Exception {
        userService.getUserProfile(jwt);
        List<Submission> submissions = submissionService.getAllTaskSubmission();
        return new ResponseEntity<>(submissions, HttpStatus.OK);
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<Submission>> getAllSubmissionsByTask(@PathVariable Long taskId,
                                                                    @RequestHeader("Authorization") String jwt) throws Exception {
        userService.getUserProfile(jwt);
        List<Submission> submissions = submissionService.getTaskSubmissionbyId(taskId);
        return new ResponseEntity<>(submissions, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Submission> acceptOrDeclineSubmission(@PathVariable Long id,
                                                                @RequestParam String status,
                                                                @RequestHeader("Authorization") String jwt) throws Exception {
        userService.getUserProfile(jwt);
        Submission submission = submissionService.acceptDeclineSubmission(id, status);
        return new ResponseEntity<>(submission, HttpStatus.OK);
    }
}
