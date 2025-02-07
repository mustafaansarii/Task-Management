# Task Management System

## Project Overview

This project is a comprehensive Task Management System built using a microservices architecture. It consists of a React-based frontend and multiple Spring Boot microservices for backend operations.

## Features

- User authentication and authorization
- Task creation, assignment, and management
- Real-time updates using WebSocket (if implemented)
- Responsive and intuitive user interface

## Technology Stack

### Frontend
- React
- Vite (for fast development and building)
- Material-UI (@mui/material)
- Redux (@reduxjs/toolkit)
- React Router
- Axios for API calls

### Backend
- Spring Boot
- Spring Cloud (Netflix Eureka for service discovery)
- Spring Security
- Spring Data JPA
- MySQL

## Project Structure

The project is divided into two main parts:

1. **Task Management-client**: Contains the React frontend application.
2. **Task Management-Server**: Contains multiple Spring Boot microservices.

### Microservices
- Task Submission Service
- Task Service
- Task User Service
- Gateway Service
