import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const Signin = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    dispatch(login(formData));
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex h-full">
      {/* Form Section */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <div className="text-center mb-6">
          <img
            className="mx-auto w-24"
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
            alt="logo"
          />
          <h4 className="text-xl font-semibold mt-4">Welcome Back!</h4>
        </div>

        <form onSubmit={handleSubmit}>
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

          <div>
            <Button
              fullWidth
              type="submit"
              sx={{ mt: 3, mb: 2 }}
              className="w-full bg-gradient-to-r from-orange-400 to-pink-600 text-white py-2 rounded shadow-lg hover:opacity-90 transition"
              variant="contained"
            >
              Login
            </Button>

          </div>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm">
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={toggleForm}
              className="text-indigo-500 font-medium hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      ></div>
    </div>
  );
};

export default Signin;
