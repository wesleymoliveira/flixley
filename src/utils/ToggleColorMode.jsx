import React, { createContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ColorModeContext = createContext();

function ToggleColorMode({ children }) {
  const [colorMode, setColorMode] = useState('light');

  const toggleColorMode = () => {
    setColorMode((prevColorMode) => (prevColorMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode: colorMode,
    },
  }, [colorMode]));

  const themeContextProviderValues = useMemo(() => ({ colorMode, setColorMode, toggleColorMode }), [colorMode, setColorMode, toggleColorMode]);

  return (
    <ColorModeContext.Provider value={themeContextProviderValues}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode;
