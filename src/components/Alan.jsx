import { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ColorModeContext } from '../utils/ToggleColorMode';
import { fetchToken } from '../utils';
import { userSelector } from '../features/auth';
import { selectGenreIdOrCategoryName, searchMovie } from '../features/currentGenreIdOrCategoryName';

function useAlan() {
  const { setColorMode } = useContext(ColorModeContext);
  const { isAuthenticated } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALANAI_KEY,
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === 'search') {
          dispatch(searchMovie(query));
        } else if (command === 'chooseGenre') {
          const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());

          if (foundGenre) {
            navigate('/');
            dispatch(selectGenreIdOrCategoryName(foundGenre.id));
          } else {
            const parsedCategory = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;

            navigate('/');
            dispatch(selectGenreIdOrCategoryName(parsedCategory));
          }
        } else if (command === 'changeMode') {
          if (mode === 'dark') {
            setColorMode('dark');
          } else {
            setColorMode('light');
          }
        } else if (command === 'login') {
          if (isAuthenticated) {
            // playText('Sorry, You are already logged in!');
          } else {
            fetchToken();
          }
        } else if (command === 'logout') {
          localStorage.clear();
          window.location.href = '/';
        }
      },
    });
  }, []);
}

export default useAlan;
