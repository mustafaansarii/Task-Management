import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { IconStack } from "@tabler/icons-react";
import CreateNewTaskForm from "./Task/CreateTask";
import { useLocation } from "react-router-dom";

const menuItems = [
  { name: "Home", value: "Home", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "DONE", value: "DONE", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "ASSIGNED", value: "ASSIGNED", role: ["ROLE_ADMIN"] },
  { name: "NOT ASSIGNED", value: "PENDING", role: ["ROLE_ADMIN"] },
  { name: "Create New Task", value: "CreateTask", role: ["ROLE_ADMIN"] },
  { name: "Notification", value: "NOTIFICATION", role: ["ROLE_CUSTOMER"] },
];

const role = "ROLE_ADMIN";

const SideBar = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Home");
  const [openCreateTask, setOpenCreateTask] = useState(false);

  const handleCloseTaskForm = () => setOpenCreateTask(false);
  const handleOpenTaskForm = () => setOpenCreateTask(true);

  const handleMenuChange = (item) => {
    const updatedParams = new URLSearchParams(location.search);
    if (item.name === "Create New Task") {
      handleOpenTaskForm();
    }
    else if (item.name === "Home") {
      updatedParams.delete("filter");
      const queryString = updatedParams.toString();
      const updatedPath = queryString ? `${location.pathname}?${queryString}` : location.pathname;
      navigate(updatedPath);
    }
    else {
      updatedParams.set("filter", item.value);
      navigate(`${location.pathname}?${updatedParams.toString()}`);
      
    }
    setActiveMenu(item.name);
  };

  const handleLogout = () => console.log("Logged out successfully!");

  return (
    <>
      <div className="h-screen w-80 bg-[#0d0415] flex flex-col items-center py-6 shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-[#a307ba] bg-[#a307ba]">
            <IconStack size={48} stroke={2} color="white" />
          </div>
          <p className="text-white text-lg font-bold mt-4">Task Management System</p>
        </div>
        <div className="flex flex-col gap-4 w-full px-6">
          {menuItems
            .filter((item) => item.role.includes(role))
            .map((item) => (
              <p
                key={item.name}
                onClick={() => handleMenuChange(item)}
                className={`py-3 px-5 rounded-full text-center cursor-pointer ${
                  activeMenu === item.name
                    ? "bg-[#a307ba] text-white font-bold"
                    : "bg-transparent border-2 border-[#a307ba] text-white font-medium hover:bg-[#a307ba] hover:text-white transition duration-300"
                }`}
              >
                {item.name}
              </p>
            ))}
          <button
            onClick={handleLogout}
            className="w-full py-3 mt-6 text-white font-semibold rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
      <CreateNewTaskForm open={openCreateTask} handleClose={handleCloseTaskForm} />
    </>
  );
};

export default SideBar;
