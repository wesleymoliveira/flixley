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
  const [isFavorited, setIsFavorited] = React.useState(true);
  const [isWatchListed, setIsWatchListed] = React.useState(true);
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

  const addToFavorites = () => {
    console.log('Add to favorites');
  };

  const addToWatchlist = () => {
    console.log('Add to watchlist');
  };

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
        <Typography variant="h5" style={{ marginTop: '10px' }} gutterBottom>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }} gutterBottom>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data && data.credits?.cast?.map((cast, i) => (
            cast.profile_path && (
              <Grid item key={i} xs={4} md={2} component={Link} to={`/actors/${cast.id}`} style={{ textDecoration: 'none' }}>
                <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${cast?.profile_path}`} alt={cast?.name} />
                <Typography color="textPrimary">
                  {cast?.name}
                </Typography>
                <Typography color="textSecondary">
                  {cast?.character.split('/')[0]}
                </Typography>
              </Grid>
            )

          )).slice(0, 6)}
        </Grid>
        <Grid item container spacing={2} style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup variant="outlined" size="medium">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>
                  Website
                </Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
                  IMDB
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.youtube.com/results?search_query=${data?.title}+trailer`}
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>

              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup variant="outlined" size="medium">
                <Button onClick={addToFavorites} endIcon={isFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  Favorite
                </Button>
                <Button onClick={addToWatchlist} endIcon={isWatchListed ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography style={{ textDecoration: 'none' }} variant="subtitle1" component={Link} to="/" color="inherit">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>

          </div>
        </Grid>

      </Grid>
    </Grid>
  );
}

export default MovieInformation;
