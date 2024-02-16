import { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import renderRoutes from './routes'
import { jwtDecode } from 'jwt-decode';
import * as UserService from './services/UserService'
import { updateUser } from './redux/slides/userSlide';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    const access_token = localStorage?.getItem('access_token');
    if (access_token) {
      const decoded = jwtDecode(access_token);
      if (decoded?.id) {
        handleGetUserDetail(decoded?.id, access_token);
      }
    }
  }, []);

  const handleGetUserDetail = async (id, access_token) => {
    try {
      const res = await UserService.getDetailsUser(id, access_token);
      dispatch(updateUser({ ...res.data, access_token }));
    } catch (error) {
      console.error("Error fetching user details");
    }
  }

  return (
    <Suspense fallback={<>Loading...</>}>
      <BrowserRouter>
        <Routes>
          {renderRoutes()}
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
