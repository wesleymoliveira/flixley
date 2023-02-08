import React, { useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

function Profile() {
  const { user, sessionId } = useSelector(userSelector);

  const { data: favoriteMovies } = useGetListQuery({ accountId: user.id, listName: 'favorite/movies', sessionId, page: 1 });

  const { data: watchlistMovies } = useGetListQuery({ accountId: user.id, listName: 'watchlist/movies', sessionId, page: 1 });

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {
         !favoriteMovies ? (
           <Typography variant="h5">
             Add some movies to your favorite list to see them here!
           </Typography>
         ) : (
           <Box>
             FAVORITE MOVIES
             <MovieList movies={favoriteMovies} />
           </Box>
         )
      }

      {
         !watchlistMovies ? (
           <Typography variant="h5">
             Watchlist some movies to see them here!
           </Typography>
         ) : (
           <Box>
             WATCHLIST
             <MovieList movies={watchlistMovies} />
           </Box>
         )
      }
    </Box>
  );
}

export default Profile;
