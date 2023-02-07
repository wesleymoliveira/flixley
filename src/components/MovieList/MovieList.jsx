import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import Movie from '../Movie/Movie';

function MovieList({ movies, numberOfMovies }) {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center" className={classes.moviesContainer}>
      {movies.results.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}

    </Grid>
  );
}

export default MovieList;
