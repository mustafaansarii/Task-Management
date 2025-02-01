import React from 'react';
import { Modal, Box } from '@mui/material';
import SubmissionCard from './SubmissionCard';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'black',
  color: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

// Use the List array to store submissions
const List = [
  {
    id: 1,
    githubLink: "https://github.com/example",
    submissionTime: "2024-01-18T22:15:38",
  },
  {
    id: 2,
    githubLink: "https://github.com/example2",
    submissionTime: "2024-01-19T14:30:00",
  },
];

export default function SubmissionList({ open, handleClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {List.length > 0 ? (
              <div className="space-y-2">
                {List.map((submission, index) => (
                  <SubmissionCard key={index} submission={submission} />
                ))}
              </div>
            ) : (
              <div className="text-center">No Submission Found</div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
