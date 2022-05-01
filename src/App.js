import { Route, Routes } from 'react-router-dom';
import Blogs from './Pages/Blogs/Blogs';
import Header from './Pages/Header/Header/Header';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import ResetPassword from './Pages/Login/ResetPassword/ResetPassword';
import RequireAuth from './Pages/Shared/RequireAuth/RequireAuth';
import TestProtected from './Pages/Shared/TestProtected/TestProtected';

const App = () => {
  return (
    <div className="App font-poppins dark:bg-darkGray-500 dark:text-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <TestProtected />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
