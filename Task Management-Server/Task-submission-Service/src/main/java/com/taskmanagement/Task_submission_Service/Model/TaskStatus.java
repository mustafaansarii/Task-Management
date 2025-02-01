package com.taskmanagement.Task_submission_Service.Model;

public enum TaskStatus {
    PENDING("PENDING"),
    ASSIGNED("ASSIGNED"),
    DONE("DONE");

    private final String status;

    TaskStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
