package com.taskmanage.task.Service.Model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TaskStatus {
    PENDING("PENDING"),
    ASSIGNED("ASSIGNED"),
    DONE("DONE");

    private final String status;

    TaskStatus(String status) {
        this.status = status;
    }

    @JsonValue
    public String getStatus() {
        return status;
    }

    @JsonCreator
    public static TaskStatus fromString(String status) {
        for (TaskStatus ts : TaskStatus.values()) {
            if (ts.status.equalsIgnoreCase(status)) {
                return ts;
            }
        }
        throw new IllegalArgumentException("Unknown status: " + status);
    }
}
