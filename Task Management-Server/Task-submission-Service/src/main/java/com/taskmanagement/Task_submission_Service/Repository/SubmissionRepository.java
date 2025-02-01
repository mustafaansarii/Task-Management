package com.taskmanagement.Task_submission_Service.Repository;

import com.taskmanagement.Task_submission_Service.Model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import com.taskmanagement.Task_submission_Service.Model.Submission;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByTaskId(Long taskId);
}