import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ROLE_CUSTOMER = 'ROLE_CUSTOMER';
const ROLE_USER = 'ROLE_USER';
const ROLE_ADMIN = 'ROLE_ADMIN';

const Signup = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Password: '',
    role: '', // Added role to state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.Username || !formData.Email || !formData.Password || !formData.role) {
      alert('Please fill all the fields');
      return;
    }

    console.log('Form Data:', formData);
    // Submit logic goes here
  };

  return (
    <div className="flex h-full">
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <div className="text-center mb-6">
          <h4 className="text-xl font-semibold mt-4">Create an Account</h4>
        </div>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            margin="normal"
            placeholder="Enter your username"
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            margin="normal"
            placeholder="Enter your email"
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            margin="normal"
            placeholder="Enter your password"
            type="password"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              name="role"
              value={formData.role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value={ROLE_CUSTOMER}>Customer</MenuItem>
              <MenuItem value={ROLE_USER}>User</MenuItem>
              <MenuItem value={ROLE_ADMIN}>Admin</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            type="submit"
            sx={{ mt: 3, mb: 2 }}
            className="bg-gradient-to-r from-orange-400 to-pink-600 text-white py-2 rounded shadow-lg hover:opacity-90 transition"
            variant="contained"
          >
            Sign up
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={toggleForm}
              className="text-indigo-500 font-medium hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>

      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/8850666/pexels-photo-8850666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      ></div>
    </div>
  );
};

export default Signup;
