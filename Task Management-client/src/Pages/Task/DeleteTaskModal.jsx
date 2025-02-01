
import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  color: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

export default function DeleteTaskModal({ open, handleClose }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          Confirm Deletion
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Are you sure you want to delete this task? This action cannot be undone.
        </Typography>
      </Box>
    </Modal>
  );
}
