import { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import { ColorModeContext } from '../utils/ToggleColorMode';

function useAlan() {
  const { setColorMode } = useContext(ColorModeContext);

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALANAI_KEY,
      onCommand: ({ command, mode }) => {
        if (command === 'changeMode') {
          if (mode === 'dark') {
            setColorMode('dark');
          } else {
            setColorMode('light');
          }
        }
      },
    });
  }, []);
}

export default useAlan;
