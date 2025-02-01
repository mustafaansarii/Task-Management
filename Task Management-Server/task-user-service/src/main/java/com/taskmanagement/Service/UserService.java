package com.taskmanagement.Service;

import com.taskmanagement.Model.User;
import java.util.List;

public abstract class UserService {
    public abstract User getUserProfile(String jwt);

    public abstract List<User> getAllUsers();
}
