import React, { useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
import RatedCards from '../RatedCards/RatedCards';

function Profile() {
  const { user, sessionId } = useSelector(userSelector);

  const { data: favoriteMovies, refetch: refetchFavorites, isFetching: isFetchingFavorites } = useGetListQuery({ accountId: user.id, listName: 'favorite/movies', sessionId, page: 1 });

  const { data: watchlistMovies, refetch: refetchWatchlist, isFetching: isFetchingWatchlist } = useGetListQuery({ accountId: user.id, listName: 'watchlist/movies', sessionId, page: 1 });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlist();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  if (isFetchingFavorites || isFetchingWatchlist) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CircularProgress size="8rem" />
      </Box>
    );
  }

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
         !favoriteMovies?.results?.length ? (
           <Typography variant="h5">
             Add some movies to your favorite list to see them here!
           </Typography>
         ) : (
           <Box>
             <RatedCards title="Favorite Movies" movies={favoriteMovies} />
           </Box>
         )
      }

      {
         !watchlistMovies?.results?.length ? (
           <Typography variant="h5">
             Watchlist some movies to see them here!
           </Typography>
         ) : (
           <Box>
             <RatedCards title="Watchlist" movies={watchlistMovies} />
           </Box>
         )
      }
    </Box>
  );
}

export default Profile;
