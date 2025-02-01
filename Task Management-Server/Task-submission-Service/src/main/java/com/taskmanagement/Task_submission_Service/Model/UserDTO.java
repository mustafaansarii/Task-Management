package com.taskmanagement.Task_submission_Service.Model;

public class UserDTO {

    private Long id;
    private String email;
    private String role;
    private String fullName;
    private String password;

    // No-argument constructor
    public UserDTO() {
    }

    // All-argument constructor
    public UserDTO(Long id, String email, String role, String fullName, String password) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.fullName = fullName;
        this.password = password;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
