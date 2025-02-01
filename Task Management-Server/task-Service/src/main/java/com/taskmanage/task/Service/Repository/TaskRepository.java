package com.taskmanage.task.Service.Repository;

import com.taskmanage.task.Service.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedUser(String assignedUser);
}
