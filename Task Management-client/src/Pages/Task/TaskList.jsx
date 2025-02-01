import { useEffect } from 'react';
import { useEffect } from 'react';
import React, { useEffect } from 'react';
import TaskCard from './TaskCard';
import { useDispatch, useSelector } from 'react-redux';
import { use } from 'react';
import { fetchTasks } from '../../ReduxToolKit/TaskSlice.js';
import { useLocation } from 'react-router-dom';

function TaskList() {
  const dispatch=useDispatch();
  const {task,auth}= useSelector (state => state.tasks);
  const location=useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValue= queryParams.get('filter');

  useEffect(() => {
    if(auth.user?.role==="ROLE_ADMIN"){
      dispatch(fetchTasks({status:filterValue}));
    }
    else{
      dispatch(fetchTasks({status:filterValue}));
    }

  }, [filterValue]);
  console.log(task);

  return (
    <div className="space-y-6 w-[67vw]">
      <div className="space-y-3">
        {task.tasks.map((item) => (
          <TaskCard item={item}/>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
