import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import taskReducer from './TaskSlice';
import submissionReducer from './SubmissionSlice'; // Renamed for consistency

const rootReducer = combineReducers({
    auth: authReducer,
    task: taskReducer,
    submission: submissionReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // `redux-thunk` is included by default
});

export default store;
