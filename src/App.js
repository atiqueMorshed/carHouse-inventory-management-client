import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Header from './Pages/Header/Header/Header';
import RequireAuth from './Pages/Shared/RequireAuth/RequireAuth';
import Home from './Pages/Home/Home/Home';
import Blogs from './Pages/Blogs/Blogs';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import ResetPassword from './Pages/Login/ResetPassword/ResetPassword';
import AddCar from './Pages/AddCar/AddCar';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import Footer from './Pages/Footer/Footer';
import ErrorFallback from './Pages/Shared/ErrorFallback/ErrorFallback';
import NotFound from './Pages/Shared/NotFound/NotFound';
import InventoryCar from './Pages/InventoryCar/InventoryCar';
import ManageInventories from './Pages/ManageInventories/ManageInventories';
import MyCars from './Pages/MyCars';
import Title from './Pages/Shared/Title/Title';
import About from './Pages/About/About';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const App = () => {
  return (
    <div className="App font-poppins dark:bg-darkGray-500 dark:text-white">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error) => {
          console.log('ERROR BOUNDARY: ', error.message);
        }}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Title title="Home" />
                  <Home />
                </>
              }
            />
            <Route
              path="/blog"
              element={
                <>
                  <Title title="Blog" />
                  <Blogs />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Title title="About" />
                  <About />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Title title="Login" />
                  <Login />
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <Title title="Register" />
                  <Register />
                </>
              }
            />
            <Route
              path="/reset"
              element={
                <>
                  <Title title="Reset Password" />
                  <ResetPassword />
                </>
              }
            />

            <Route
              path="/addCar"
              element={
                <RequireAuth>
                  <>
                    <Title title="Add Car" />
                    <AddCar />
                  </>
                </RequireAuth>
              }
            />
            <Route
              path="/inventory/:id"
              element={
                <RequireAuth>
                  <>
                    <Title title="Inventory Car" />
                    <InventoryCar />
                  </>
                </RequireAuth>
              }
            />
            <Route
              path="/manageInventories"
              element={
                <RequireAuth>
                  <>
                    <Title title="Manage Inventories" />
                    <ManageInventories />
                  </>
                </RequireAuth>
              }
            />
            <Route
              path="/myCars"
              element={
                <RequireAuth>
                  <>
                    <Title title="My Cars" />
                    <MyCars />
                  </>
                </RequireAuth>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <Title title="Not Found" />
                  <NotFound />
                </>
              }
            />
          </Routes>
          {/* Enables react query devtools */}
          {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
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
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default App;
