import React from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating, ListItemIcon } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { selectGenreIdOrCategoryName } from '../../features/currentGenreIdOrCategoryName';

import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { useGetMovieQuery } from '../../services/TMDB';

function MovieInformation() {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const dispatch = useDispatch();
  const classes = useStyles();

  if (isFetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size="8rem" />;
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link to="/">Go back, something has gone wrong</Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceRound}>
      <Grid item sm={12} lg={4}>
        <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title} />

      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceRound}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography style={{ marginLeft: '10px' }} variant="subtitle1" gutterBottom>

              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>

            {data?.runtime} min / {data?.spoken_languages.lenght > 1 ? data?.spoken_languages.map((language) => language.name).join(', ') : data?.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, i) => (
            <Link onClick={() => dispatch(selectGenreIdOrCategoryName(genre.id))} className={classes.links} key={i} to="/">
              <ListItemIcon>
                <img src={`${genreIcons[genre.name.toLowerCase()]}`} className={classes.genreImage} height={30} />
                <Typography color="textPrimary" variant="subtitle1">
                  {genre?.name}
                </Typography>
              </ListItemIcon>
            </Link>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieInformation;
