package com.taskmanagement.Task_submission_Service.Model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class TaskDTO {

    private Long id;
    private String title;
    private String description;
    private String image;
    private String assignedUser;
    private List<String> tags = new ArrayList<>();
    private TaskStatus status;
    private LocalDateTime deadLine;
    private LocalDateTime createdAt;

    // No-argument constructor
    public TaskDTO() {
    }

    // All-argument constructor
    public TaskDTO(Long id, String title, String description, String image, String assignedUser, List<String> tags, TaskStatus status, LocalDateTime deadLine, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.assignedUser = assignedUser;
        this.tags = tags;
        this.status = status;
        this.deadLine = deadLine;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAssignedUser() {
        return assignedUser;
    }

    public void setAssignedUser(String assignedUser) {
        this.assignedUser = assignedUser;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public LocalDateTime getDeadLine() {
        return deadLine;
    }

    public void setDeadLine(LocalDateTime deadLine) {
        this.deadLine = deadLine;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
