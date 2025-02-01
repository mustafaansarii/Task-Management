import './App.css'
import { useState } from 'react'
import NavBar from './Pages/NavBar'
import Home from './Pages/HomePages/Home'
import Auth from './Pages/Auth/Auth'
import {getUserProfile} from './ReduxToolKit/AuthSlice'
function App() {
  const user = true;
  const dispatch = useDispatch();
  const { task, auth } = useSelector(store => store);

  useEffect(() => {
    dispatch(fetchTasks({}));
    dispatch(getUserProfile( auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt]);

  return (
    <>
      {auth.user ?
        <div>
          <NavBar />
          <Home />
        </div> : <Auth />}

    </>
  )
}

export default App
