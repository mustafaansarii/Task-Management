import React from 'react';
import {
  Box,
  Typography,
  Modal,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from '@mui/material';
import { IconUserCircle } from '@tabler/icons-react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Adjusted to be responsive
  maxWidth: 400, // Maximum width for larger screens
  bgcolor: 'black', // Use MUI color syntax
  color: 'white',
  boxShadow: 24,
  p: 2,
  borderRadius: '8px', // Optional: Rounded corners for a smoother UI
};

export default function UserList({ handleClose, open }) {
  const users = [
    { id: 1, name: 'Ali Connors', description: 'Brunch this weekend?' },
    { id: 2, name: 'Sandra Adams', description: 'Meeting next week?' },
    { id: 1, name: 'Ali Connors', description: 'Brunch this weekend?' },
    { id: 2, name: 'Sandra Adams', description: 'Meeting next week?' },
  ];

  // Ensure open is boolean
  const isOpen = Boolean(open);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose} // Close the modal when clicking outside
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" id="modal-modal-title" sx={{ mb: 2 }}>
          User List
        </Typography>
        {users.map((user, index) => (
          <div key={user.id}>
            <ListItem disableGutters>
              <ListItemAvatar>
                <Avatar>
                  <IconUserCircle stroke={2} size={28} className="text-indigo-500" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography sx={{ color: 'white' }}>{user.name}</Typography>}
                secondary={<Typography sx={{ color: 'white', fontSize: '0.875rem' }}>{user.description}</Typography>}
              />
              <button className="bg-pink-500 text-white px-4 py-1 rounded-md">
                Select
              </button>
            </ListItem>
            {/* Add divider below each item except the last one */}
            {index < users.length - 1 && (
              <Divider variant="inset" sx={{ borderColor: 'white' }} />
            )}
          </div>
        ))}
      </Box>
    </Modal>
  );
}
