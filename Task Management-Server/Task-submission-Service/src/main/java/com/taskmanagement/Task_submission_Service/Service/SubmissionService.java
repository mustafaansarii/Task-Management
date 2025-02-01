package com.taskmanagement.Task_submission_Service.Service;

import com.taskmanagement.Task_submission_Service.Model.Submission;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SubmissionService {
    Submission submitTask(Long id, String githubLink, Long userId,String jwt ) throws Exception;
    Submission getSubmissionById(Long id) throws Exception;
    List<Submission> getAllTaskSubmission();
    List<Submission> getTaskSubmissionbyId(Long taskId);
    Submission acceptDeclineSubmission(Long id, String status) throws Exception;


}
