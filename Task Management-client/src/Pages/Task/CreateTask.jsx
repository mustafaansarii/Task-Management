import React from "react";
import { Modal, Box, TextField, Grid, Autocomplete, Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch } from "react-redux";
import { createTask } from "../../ReduxToolKit/TaskSlice";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    color: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
};

const inputStyles = {
    "& .MuiOutlinedInput-root": {
        color: "white", // Text color
        "& fieldset": {
            borderColor: "white", // Border color
        },
        "&:hover fieldset": {
            borderColor: "white", // Border color on hover
        },
        "&.Mui-focused fieldset": {
            borderColor: "white", // Border color when focused
        },
    },
    "& .MuiInputLabel-root": {
        color: "white", // Label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "white", // Focused label color
    },
};

const tags = [
    "React", "Node.js", "Express", "MongoDB", "JavaScript", "TypeScript", "Python",
    "Django", "Flask", "Java", "Spring", "C++", "C#", "C", "HTML", "CSS", "SASS",
    "Tailwind CSS", "Bootstrap", "Material-UI", "Chakra UI", "Ant Design", "GraphQL",
    "REST API", "Docker", "Kubernetes", "AWS", "GCP", "Azure", "Firebase", "Heroku",
    "Netlify", "Vercel", "Git", "GitHub", "GitLab"
];

const CreateNewTaskForm = ({handleClose, open}) => {
    const dispatch=useDispatch();
    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        image: "",
        tags: [],
        deadline: "",
    });

    const formatDate = (input) => {
        let { $y: year, $M: month, $D: day, $H: hours, $m: minutes, $s: seconds, $ms: milliseconds } = input;
        let date = new Date(year, month, day, hours, minutes, seconds, milliseconds);
        const formattedDate = date.toISOString();
        return formattedDate;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTagsChange = (event, value) => {
        setFormData((prevData) => ({
            ...prevData,
            tags: value,
        }));
    };

    const handleDeadlineChange = (date) => {
        setFormData({
            ...formData,
            deadline: date,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { deadline } = formData;
        formData.deadline = formatDate(deadline);
        formData.tags = selectedTags
        dispatch(createTask(formData))
        console.log("Form Data Submitted:", formData); // Log all form data
        handleClose();
    };
    
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="taskName"
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                sx={inputStyles}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                multiline
                                rows={4}
                                id="description"
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                sx={inputStyles}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="image"
                                label="Image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                sx={inputStyles}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                id="tags-autocomplete"
                                options={tags}
                                value={formData.tags}
                                onChange={handleTagsChange}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tags"
                                        placeholder="Select Tags"
                                        sx={inputStyles}
                                    />
                                )}
                                sx={{
                                    "& .MuiChip-root": {
                                        backgroundColor: "white",
                                        color: "black",
                                    },
                                    "& .MuiAutocomplete-listbox": {
                                        backgroundColor: "black",
                                        color: "white",
                                    },
                                    "& .MuiAutocomplete-option:hover": {
                                        backgroundColor: "gray",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    onChange={handleDeadlineChange}
                                    className="w-full"
                                    label="Deadline"
                                    slots={{
                                        textField: (params) => (
                                            <TextField
                                                {...params}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        backgroundColor: "gray", // Input background color
                                                        color: "white", // Text color inside the input
                                                        "& fieldset": {
                                                            borderColor: "white", // Border color
                                                        },
                                                        "&:hover fieldset": {
                                                            borderColor: "white", // Border color on hover
                                                        },
                                                        "&.Mui-focused fieldset": {
                                                            borderColor: "white", // Border color when focused
                                                        },
                                                    },
                                                    "& .MuiInputBase-input": {
                                                        color: "white", // Text color for input
                                                    },
                                                    "& .MuiInputLabel-root": {
                                                        color: "white", // Placeholder/Label color
                                                    },
                                                    "& .MuiInputLabel-root.Mui-focused": {
                                                        color: "white", // Label color when focused
                                                    },
                                                }}
                                            />
                                        ),
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Button
                            type="submit"
                            sx={{
                                backgroundColor: "pink",
                                color: "black",
                                border: "1px solid white",
                                borderRadius: "30px",
                                padding: "0.5rem 1rem",
                                cursor: "pointer",
                                width: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "0 auto",
                                marginTop: "1rem",
                            }}
                        >
                            Create Task
                        </Button>


                    </Grid>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateNewTaskForm;
