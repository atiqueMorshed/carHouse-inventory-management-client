import { Route, Routes } from 'react-router-dom';
import Blogs from './Pages/Blogs/Blogs';
import Header from './Pages/Header/Header/Header';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login/Login';

const App = () => {
  return (
    <div className="App font-poppins dark:bg-darkGray-500 dark:text-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
