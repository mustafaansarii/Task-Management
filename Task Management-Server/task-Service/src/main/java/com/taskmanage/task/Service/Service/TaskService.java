package com.taskmanage.task.Service.Service;

import com.taskmanage.task.Service.Model.Task;
import com.taskmanage.task.Service.Model.TaskStatus;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface TaskService {
    Task createTask(Task task, String requestRole) throws Exception;
    Task getTaskById(Long id) throws Exception;
    List<Task> getAllTask(TaskStatus status);
    Task updateTask(Long id, Task updatedTask, Long userid) throws Exception;
    Task deleteTask(Long id) throws Exception;
    Task assignedToUser(Long userid, Long taskid) throws Exception;
    List<Task> assignedUserTask(Long userid, TaskStatus status);
    Task completeTask(Long taskid) throws Exception;
}
