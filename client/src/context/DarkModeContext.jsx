// DarkModeContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

// Custom hook to use Dark Mode context
// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => useContext(DarkModeContext);

// DarkModeProvider component
// eslint-disable-next-line react/prop-types
export const DarkModeProvider = ({ children }) => {
  // Initialize state with the value from localStorage, defaulting to false (light mode) if not set
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedPreference = localStorage.getItem('dark-mode');
    return storedPreference ? JSON.parse(storedPreference) : false;
  });

  // Update localStorage and document class whenever dark mode state changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dark-mode', true);
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dark-mode', false);
    }
  }, [isDarkMode]);

  // Function to toggle dark mode state
  const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};