import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from "../api/api"
import  setAuthHeader  from '../Pages/Auth/Auth.jsx'; // Assuming setAuthHeader is a utility function

// Async Thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks',
    async () => {
        setAuthHeader(localStorage.getItem('jwt'), api);

        try {
            const { data } = await api.get("/api/task");
            params: {status}
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to fetch tasks');
        }
    }
);

export const fetchUsersTasks = createAsyncThunk('tasks/fetchUsersTasks', 
    async ({ status }) => {
        setAuthHeader(localStorage.getItem('jwt'), api);

        try {
            const { data } = await api.get("/api/task/user", {
                params: { status }
            });
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to fetch user tasks');
        }
    }
);

export const fetchTasksById = createAsyncThunk('tasks/fetchTasksById', 
    async (taskId) => {
        setAuthHeader(localStorage.getItem('jwt'), api);

        try {
            const { data } = await api.get(`/api/task/${taskId}`);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to fetch task by ID');
        }
    }
);

export const createTask = createAsyncThunk('tasks/createTask',
    async (taskData) => {
        setAuthHeader(localStorage.getItem('jwt'), api);

        try {
            const { data } = await api.post('/api/task', taskData);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to create task');
        }
    }
);

export const updateTask = createAsyncThunk('tasks/updateTask',
    async ({ id, updatedData }) => {
        setAuthHeader(localStorage.getItem('jwt'), api);

        try {
            const { data } = await api.put(`/api/task/${id}`, updatedData);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to update task');
        }
    }
);

export const assignTaskToUser = createAsyncThunk('tasks/assignTaskToUser',
    async ({ taskId, userId }) => {
        setAuthHeader(localStorage.getItem('jwt'), api);

        try {
            const { data } = await api.put(`/api/task/${taskId}/assign/${userId}/assigned`);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to assign task to user');
        }
    }
);

export const deleteTask = createAsyncThunk('tasks/deleteTask',
    async (taskId) => {
        setAuthHeader(localStorage.getItem('jwt'), api);

        try {
            await api.delete(`/api/task/${taskId}`);
            return taskId;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to delete task');
        }
    }
);

// Task Slice
export const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [], // Holds all tasks
        loading: false,
        error: null,
        taskDetails: null,
        usersTask: [] // Optional: Based on other reducers
    },
    
    reducers: {
        clearTaskDetails: (state) => {
            state.taskDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.usersTask = action.payload;
            })
            .addCase(fetchUsersTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchTasksById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasksById.fulfilled, (state, action) => {
                state.loading = false;
                state.taskDetails = action.payload;
            })
            .addCase(fetchTasksById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                const updatedTask = action.payload;
                state.tasks = state.tasks.map(task => 
                    task.id === updatedTask.id ? { ...task, ...updatedTask } : task
                );
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(assignTaskToUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(assignTaskToUser.fulfilled, (state, action) => {
                state.loading = false;
                const updatedTask = action.payload;
                state.tasks = state.tasks.map(task => 
                    task.id === updatedTask.id ? { ...task, ...updatedTask } : task
                );
            })
            .addCase(assignTaskToUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearTaskDetails } = taskSlice.actions;
export default taskSlice.reducer;
