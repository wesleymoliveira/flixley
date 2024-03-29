import React from 'react';
import { Grid, Grow, Tooltip, Typography, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

function Movie({ movie, i }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={5} lg={3} xl={3} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link className={classes.links} to={`/movies/${movie.id}`}>
          <img
            alt={movie.title}
            className={classes.image}
            src={!movie.poster_path
              ? 'https://www.filmurray.com/200/300'
              : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
          <Typography className={classes.title} variant="h5">
            {movie.title}
          </Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average}/10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />

            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
}

export default Movie;
