import React from 'react';
import SideBar from '../SideBar';
import TaskList from '../Task/TaskList';

function Home() {
  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Sidebar Section */}
      <div className="lg:w-1/4">
        <SideBar />
      </div>

      {/* Main Content Section */}
      <div className="lg:w-3/4 flex justify-center items-center bg-[#0d0415]">
        <TaskList />
      </div>
    </div>
  );
}

export default Home;
