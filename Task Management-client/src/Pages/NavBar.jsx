import React from 'react';
import { Avatar } from '@mui/material';


function NavBar() {
  const { task, auth } = useSelector(store => store);
  return (
    <div className=" backdrop-blur-lg z-10 sticky top-0 left-0 right-0 h-16 flex items-center justify-between shadow-md px-5 lg:px-10">
      {/* Brand / Logo */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl text-indigo-600">Task Management</span>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        <p>{auth.user?.fullName}</p>
        <span className="text-sm font-medium dark:text-gray-300 text-gray-700">Mustafa</span>
        <img className='w-10 h-10 rounded-full'  src="https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
      </div>
    </div>
  );
}

export default NavBar;
