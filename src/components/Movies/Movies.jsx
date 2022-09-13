import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

function Movies() {
  const { data, isFetching, isLoading, error } = useGetMoviesQuery();

  if (isFetching || isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />

      </Box>
    );
  }

  if (!data.results.length) {
    <Box display="flex" alignItems="center" mt="20px">
      <Typography variant="h4">
        No movies found with that parameters.
        <br />
        Please search for something else.
      </Typography>
    </Box>;
  }

  if (error) {
    <Box display="flex" alignItems="center" mt="20px">
      <Typography variant="h4">
        An error ocurred.
        <br />
        Please try again.
      </Typography>
    </Box>;
  }

  return (
    <div><MovieList movies={data} /></div>
  );
}

export default Movies;
