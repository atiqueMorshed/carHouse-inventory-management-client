import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Header from './Pages/Header/Header/Header';
import RequireAuth from './Pages/Shared/RequireAuth/RequireAuth';
import Home from './Pages/Home/Home/Home';
import Blogs from './Pages/Blogs/Blogs';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import ResetPassword from './Pages/Login/ResetPassword/ResetPassword';
import TestProtected from './Pages/Shared/TestProtected/TestProtected';
import AddCar from './Pages/AddCar/AddCar';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

const queryClient = new QueryClient();
const App = () => {
  return (
    <div className="App font-poppins dark:bg-darkGray-500 dark:text-white">
      <QueryClientProvider client={queryClient}>
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
          <Route
            path="/addCar"
            element={
              <RequireAuth>
                <AddCar />
              </RequireAuth>
            }
          />
        </Routes>
        {/* Enables react query devtools */}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
      <ToastContainer
        enableMultiContainer
        containerId={'AutoCloseEnabled'}
        position="top-right"
        autoClose={true}
        newestOnTop={false}
        closeOnClick={true}
        hideProgressBar={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
      />

      <ToastContainer
        enableMultiContainer
        containerId={'AutoCloseDisabled'}
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </div>
  );
};

export default App;
