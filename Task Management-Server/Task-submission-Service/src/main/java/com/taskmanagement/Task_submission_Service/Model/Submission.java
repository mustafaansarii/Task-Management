package com.taskmanagement.Task_submission_Service.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long taskId;
    private Long userId;
    private String gitHubLink;
    private String status = "PENDING";
    private LocalDateTime submissionTime;

    // Constructors
    public Submission() {
    }

    public Submission(Long id, Long taskId, Long userId, String gitHubLink, String status, LocalDateTime submissionTime) {
        this.id = id;
        this.taskId = taskId;
        this.userId = userId;
        this.gitHubLink = gitHubLink;
        this.status = status;
        this.submissionTime = submissionTime;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getGitHubLink() {
        return gitHubLink;
    }

    public void setGitHubLink(String gitHubLink) {
        this.gitHubLink = gitHubLink;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getSubmissionTime() {
        return submissionTime;
    }

    public void setSubmissionTime(LocalDateTime submissionTime) {
        this.submissionTime = submissionTime;
    }
}
