import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
  Pagination,

} from '@mui/material';
import {
  ArrowBack,
} from '@mui/icons-material';

import {
  useGetActorDetailsQuery,
  useGetMoviesByActorQuery,
} from '../../services/TMDB';

import useStyles from './styles';
import MovieList from '../MovieList/MovieList';

function Actors() {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorDetailsQuery(id);
  const { data: moviesByActor, isFetching: moviesByActorIsFetching, error: moviesByActorError } = useGetMoviesByActorQuery({ id, page });

  const classes = useStyles();
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (isFetching || moviesByActorIsFetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
      >
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button color="primary" startIcon={<ArrowBack />} component={Link} to="/">
          Go back to home
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img className={classes.image} src={`https://image.tmdb.org/t/p/w500${data.profile_path}`} alt={data.name} />
        </Grid>
        <Grid item lg={7} xl={8} display="flex" justifyContent="center" flexDirection="column">
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || 'No biography available'}
          </Typography>
          <Box display="flex" marginTop="2rem" justifyContent="space-around" flexWrap="wrap">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
              IMDB
            </Button>
            <Button startIcon={<ArrowBack />} component={Link} to="/" color="primary">
              Go back home
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" align="center" gutterBottom>
          Movies
        </Typography>
        {moviesByActor && !moviesByActorError && (
          <>
            <MovieList movies={moviesByActor} numberOfMovies={12} />
            <Box display="flex" justifyContent="center" mt="20px">
              <Pagination count={moviesByActor?.total_pages} page={page} onChange={handlePageChange} color="primary" />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default Actors;
