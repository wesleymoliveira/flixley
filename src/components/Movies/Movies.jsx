import React, { useState } from 'react';
import { Box, CircularProgress, Typography, Pagination, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import { FeaturedMovie, MovieList } from '..';

function Movies() {
  const [page, setPage] = useState(1);
  const isMobile = useMediaQuery('(max-width:600px)');
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreIdOrCategoryName);

  const { data, isFetching, isLoading, error } = useGetMoviesQuery({ genreIdOrCategoryName, searchQuery, page });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
    <div>
      { !isMobile && <FeaturedMovie movie={data.results[0]} /> }
      <MovieList movies={data} numberOfMovies={data?.results?.length} />
      <Box display="flex" justifyContent="center" mt="20px">
        <Pagination count={data.total_pages} page={page} onChange={handlePageChange} color="primary" />
      </Box>
    </div>
  );
}

export default Movies;
