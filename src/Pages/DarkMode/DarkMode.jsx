import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
const DarkMode = () => {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem('carhouse-theme'))?.mode || 'dark'
  );

  useEffect(() => {
    localStorage.setItem('carhouse-theme', JSON.stringify({ mode: theme }));

    const bodyClass = document.body.classList;
    theme === 'dark' ? bodyClass.add('dark') : bodyClass.remove('dark');
  }, [theme]);

  return (
    <div
      onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      className="flex justify-center items-center gap-3 py-1 px-3 border rounded-xl cursor-pointer"
    >
      {theme === 'dark' ? (
        <FontAwesomeIcon className="w-5 h-5" icon={faMoon} />
      ) : (
        <FontAwesomeIcon className="w-5 h-5" icon={faSun} />
      )}
      <h1>Mode</h1>
    </div>
  );
};

export default DarkMode;
