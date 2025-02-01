import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Submit a task with a GitHub link
export const submitTask = createAsyncThunk(
    'submission/submitTask',
    async ({ taskId, githubLink }) => {
        setAuthHeader(localStorage.getItem('jwt'), api);
        try {
            const { data } = await api.put(`/api/submission`, null, {
                params: { task_id: taskId, github_link: githubLink }
            });
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to submit task');
        }
    }
);

// Fetch all submissions
export const fetchAllSubmissions = createAsyncThunk(
    'submission/fetchAllSubmissions',
    async () => {
        setAuthHeader(localStorage.getItem('jwt'), api);
        try {
            const { data } = await api.get('/api/submission');
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to fetch submissions');
        }
    }
);

// Fetch all submissions for a specific task
export const fetchAllSubmissionsByTaskId = createAsyncThunk(
    'submission/fetchAllSubmissionsByTaskId',
    async (taskId) => {
        setAuthHeader(localStorage.getItem('jwt'), api);
        try {
            const { data } = await api.get(`/api/submission/task/${taskId}`);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to fetch submissions by task ID');
        }
    }
);

// Accept or decline a submission
export const acceptDeclineSubmission = createAsyncThunk(
    'submission/acceptDeclineSubmission',
    async ({ submissionId, status }) => {
        setAuthHeader(localStorage.getItem('jwt'), api);
        try {
            const { data } = await api.put(`/api/submission/${submissionId}`, null, {
                params: { status }
            });
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to accept/decline submission');
        }
    }
);

const submissionSlice = createSlice({
    name: 'submission',
    initialState: {
        submissions: [],
        loading: false,
        error: null,
        status: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.submissions.push(action.payload);
            })
            .addCase(submitTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchAllSubmissions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllSubmissions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.submissions = action.payload;
            })
            .addCase(fetchAllSubmissions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchAllSubmissionsByTaskId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllSubmissionsByTaskId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.submissions = action.payload;
            })
            .addCase(fetchAllSubmissionsByTaskId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(acceptDeclineSubmission.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(acceptDeclineSubmission.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedSubmission = action.payload;
                state.submissions = state.submissions.map((submission) =>
                    submission.id === updatedSubmission.id
                        ? { ...submission, ...updatedSubmission }
                        : submission
                );
            })
            .addCase(acceptDeclineSubmission.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default submissionSlice.reducer;
