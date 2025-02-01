import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserList from './Userlist'; // Ensure correct import path
import SubmissionList from './SubmissionList'; // Ensure correct import path
import EditTaskForm from "./EditTaskForm"
import DeleteTaskModal from './DeleteTaskModal'; // Ensure correct import path
import { useDispatch } from 'react-redux';

const role="ROLE_ADMIN"
export default function TaskCard({item}) {
  const location=useLocation();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openUserList, setOpenUserList] = useState(false); // Initialize as false
  const [openSubmissionList, setOpenSubmissionList] = useState(false); // Initialize as false
  const [openEditTaskForm, setOpenEditTaskForm] = useState(false); // Initialize as false
  const [openDeleteTaskModal, setOpenDeleteTaskModal] = useState(false); // Initialize as false

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenUserList = () => {
    setOpenUserList(true);
    handleCloseMenu();
  };

  const handleOpenSubmissionList = () => {
    setOpenSubmissionList(true);
    handleCloseMenu();
  };

  const handleOpenEditTaskForm = () => {
    setOpenEditTaskForm(true);
    handleCloseMenu();
  };

  const handleOpenDeleteTaskModal = () => {
    dispatch(deleteTask(item.id));
    handleCloseMenu();
  };

  const handleOpenUpdateTaskModel=()=>{
    const updatedParams=new URLSearchParams(location.search)
    setOpenUpdateTaskModel(true);
    
    updatedParams.set("taskId", item.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);

    handleCloseMenu();
  }

  const handleDeleteTask=()=>{
    dispatch(deleteTask(item.id));
    handleCloseMenu();
 
  }

  const role = 'ROLE_ADMIN'; // Example role

  return (
    <div className="relative lg:flex bg-[#1f1b24] p-6 rounded-lg shadow-md gap-6">
      {/* Menu Icon */}
      <div className="absolute top-2 right-2">
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <img className='lg:w[7rem] lg:h-[7rem] object-cover'
         src={item.image} alt="" />
         alt=""
      </div>

      {/* Task Details */}
      <div className="flex flex-col justify-center space-y-5">
        <div className="space-y-2">
          <h1 className="font-bold text-lg text-white">{item.title}</h1>
          <p className="text-gray-300 text-sm">{item.description}</p>
        </div>

        <div className="flex flex-wrap items-center">
          {item.tags.length > 0 ? (
            item.tags.map((item, index) => (
              <span
                key={index}
                className="border border-[#a307ba] text-white px-5 py-1 rounded-full text-xs mr-2"
              >
                {item}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No tech stack available</p>
          )}
        </div>
      </div>

      {/* Menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        {role === 'ROLE_ADMIN' && (
          <>
            <MenuItem onClick={handleOpenUserList}>Assigned Users</MenuItem>
            <MenuItem onClick={handleOpenSubmissionList}>See Submission</MenuItem>
            <MenuItem onClick={handleOpenEditTaskForm}>Edit</MenuItem>
            <MenuItem onClick={handleOpenDeleteTaskModal}>Delete</MenuItem>
          </>
        )}
      </Menu>

      {/* Modals */}
      <UserList open={openUserList} handleClose={() => setOpenUserList(false)} />
      <SubmissionList open={openSubmissionList} handleClose={() => setOpenSubmissionList(false)} />
      <EditTaskForm item={item} open={openEditTaskForm} handleClose={() => setOpenEditTaskForm(false)} />
      <DeleteTaskModal open={openDeleteTaskModal} handleClose={() => setOpenDeleteTaskModal(false)} />
    </div>
  );
}
