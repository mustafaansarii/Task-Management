import React from 'react';
import { IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function SubmissionCard({ submission }) {
  const handleAcceptDecline = (status) => {
    console.log(`Submission ${submission.id} is ${status}`);
  };

  return (
    <div className="rounded-md bg-black p-5 flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span>GitHub:</span>
          <div className="flex items-center gap-2 text-pink-400">
            <OpenInNewIcon />
            <a
              href={submission.githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to Link
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <p>Submission Time:</p>
          <p className="text-gray-400">{submission.submissionTime}</p>
        </div>
      </div>

      <div className="flex gap-5">
        <IconButton
          color="success"
          onClick={() => handleAcceptDecline("ACCEPTED")}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => handleAcceptDecline("REJECTED")}
        >
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default SubmissionCard;
