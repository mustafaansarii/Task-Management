package com.taskmanage.task.Service.Service;

import com.taskmanage.task.Service.Model.Task;
import com.taskmanage.task.Service.Model.TaskStatus;
import com.taskmanage.task.Service.Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskServiceIMPL implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task createTask(Task task, String requestRole) throws Exception {
        if (!requestRole.equals("ROLE_ADMIN")) {
            throw new Exception("Only Admin can create task");
        }
        task.setStatus(TaskStatus.PENDING);
        task.setCreatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    @Override
    public Task getTaskById(Long id) throws Exception {
        return taskRepository.findById(id).orElseThrow(() -> new Exception("Task not found " + id));
    }

    @Override
    public List<Task> getAllTask(TaskStatus status) {
        List<Task> tasks = taskRepository.findAll();
        if (status == null) {
            return tasks;
        }
        return tasks.stream().filter(task -> task.getStatus().equals(status)).toList();
    }

    @Override
    public Task updateTask(Long id, Task updatedTask, Long userid) throws Exception {
        Task task = getTaskById(id);

        if (updatedTask.getTitle() != null) {
            task.setTitle(updatedTask.getTitle());
        }
        if (updatedTask.getImage() != null) {
            task.setImage(updatedTask.getImage());
        }
        if (updatedTask.getDescription() != null) {
            task.setDescription(updatedTask.getDescription());
        }
        if (updatedTask.getStatus() != null) {
            task.setStatus(updatedTask.getStatus());
        }
        return taskRepository.save(task);
    }

    @Override
    public Task deleteTask(Long id) throws Exception {
        getTaskById(id);
        taskRepository.deleteById(id);
        return null;
    }

    @Override
    public Task assignedToUser(Long userid, Long taskid) throws Exception {
        Task task = getTaskById(taskid);
        task.setAssignedUser(String.valueOf(userid));
        task.setStatus(TaskStatus.ASSIGNED);
        return taskRepository.save(task);
    }

    @Override
    public List<Task> assignedUserTask(Long userid, TaskStatus status) {
        List<Task> tasks = taskRepository.findByAssignedUser(String.valueOf(userid));
        if (status == null) {
            return tasks;
        }
        return tasks.stream().filter(task -> task.getStatus().equals(status)).toList();
    }

    @Override
    public Task completeTask(Long taskid) throws Exception {
        Task task = getTaskById(taskid);
        task.setStatus(TaskStatus.DONE);
        return taskRepository.save(task);
    }
}
