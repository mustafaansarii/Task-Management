package com.taskmanagement.Task_submission_Service.Service;

import com.taskmanagement.Task_submission_Service.Model.Submission;
import com.taskmanagement.Task_submission_Service.Model.TaskDTO;
import com.taskmanagement.Task_submission_Service.Repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubmissionServiceIMPL implements SubmissionService {

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Override
    public Submission submitTask(Long id, String githubLink, Long userId, String jwt) throws Exception {
        TaskDTO task = taskService.getTaskById(id, jwt);
        if (task != null) {
            Submission submission = new Submission();
            submission.setTaskId(task.getId());
            submission.setUserId(userId);
            submission.setGitHubLink(githubLink);
            submission.setSubmissionTime(LocalDateTime.now());
            return submissionRepository.save(submission);
        }
        throw new Exception("Task not found with id " + id);
    }

    @Override
    public Submission getSubmissionById(Long submissionId) throws Exception {
        return submissionRepository.findById(submissionId)
                .orElseThrow(() -> new Exception("Task submission not found with id " + submissionId));
    }

    @Override
    public List<Submission> getAllTaskSubmission() {
        return submissionRepository.findAll();
    }

    @Override
    public List<Submission> getTaskSubmissionbyId(Long taskId) {
        return submissionRepository.findByTaskId(taskId);
    }

    @Override
    public Submission acceptDeclineSubmission(Long id, String status) throws Exception {
        Submission submission = getSubmissionById(id);
        submission.setStatus(status);
        if ("ACCEPT".equalsIgnoreCase(status)) {
            taskService.completeTask(submission.getTaskId());
        }
        return submissionRepository.save(submission);
    }
}
