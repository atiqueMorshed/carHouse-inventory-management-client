import { Route, Routes } from 'react-router-dom';
import Blogs from './Pages/Blogs/Blogs';
import Header from './Pages/Header/Header/Header';
import Home from './Pages/Home/Home/Home';

const App = () => {
  return (
    <div className="App font-poppins dark:bg-darkGray-500 dark:text-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blogs />} />
      </Routes>
    </div>
  );
};

export default App;
