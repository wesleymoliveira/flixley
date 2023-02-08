import React, { useEffect, useState } from 'react';
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  Rating,
  ListItemIcon,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { MovieList } from '..';

import { selectGenreIdOrCategoryName } from '../../features/currentGenreIdOrCategoryName';

import useStyles from './styles';
import genreIcons from '../../assets/genres';
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecomendationsQuery,
} from '../../services/TMDB';
import { userSelector } from '../../features/auth';

function MovieInformation() {
  const { isAuthenticated, sessionId, user } = useSelector(userSelector);

  const { id } = useParams();

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({ accountId: user.id, listName: 'favorite/movies', sessionId, page: 1 });

  const { data: watchlistMovies } = useGetListQuery({ accountId: user.id, listName: 'watchlist/movies', sessionId, page: 1 });
  const {
    data: recomendedData,
    isFetching: recommendationsIsFetching,
    error: recommendationsError,
  } = useGetRecomendationsQuery({ movieId: id, list: '/recommendations' });
  const [isFavorited, setIsFavorited] = useState(false);
  const [isWatchListed, setIsWatchListed] = useState(true);

  useEffect(() => {
    if (!isFetching && isAuthenticated) {
      setIsFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
      setIsWatchListed(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
    }
  }, [watchlistMovies, favoriteMovies, data, isFetching, isAuthenticated]);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  if (isFetching) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error || recommendationsError) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Link to="/">Go back, something has gone wrong</Link>
      </Box>
    );
  }

  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, { media_type: 'movie', media_id: id, favorite: !isFavorited });

    setIsFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, { media_type: 'movie',
      media_id: id,
      watchlist: !isWatchListed });

    setIsWatchListed((prev) => !prev);
  };

  const handleTrailerModalClose = () => {
    setOpen(false);
  };

  return (
    <Grid container className={classes.containerSpaceRound}>
      <Grid item sm={12} lg={4} justifyContent="center" display="flex">
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
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
            <Typography
              style={{ marginLeft: '10px' }}
              variant="subtitle1"
              gutterBottom
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime} min /{' '}
            {data?.spoken_languages.lenght > 1
              ? data?.spoken_languages
                .map((language) => language?.name)
                .join(', ')
              : data?.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, i) => (
            <Link
              onClick={() => dispatch(selectGenreIdOrCategoryName(genre.id))}
              className={classes.links}
              key={i}
              to="/"
            >
              <ListItemIcon>
                <img
                  src={`${genreIcons[genre.name.toLowerCase()]}`}
                  className={classes.genreImage}
                  height={30}
                />
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
          {data
            && data.credits?.cast
              ?.map(
                (cast, i) => cast.profile_path && (
                <Grid
                  item
                  key={i}
                  xs={4}
                  md={2}
                  component={Link}
                  to={`/actors/${cast.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    className={classes.castImage}
                    src={`https://image.tmdb.org/t/p/w500/${cast?.profile_path}`}
                    alt={cast?.name}
                  />
                  <Typography color="textPrimary">{cast?.name}</Typography>
                  <Typography color="textSecondary">
                    {cast?.character.split('/')[0]}
                  </Typography>
                </Grid>
                ),
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container spacing={2} style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup variant="outlined" size="medium">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                {data?.videos?.results[0]?.key && (
                  <Button
                    onClick={() => setOpen(true)}
                    endIcon={<Theaters />}
                  >
                    Trailer
                  </Button>
                )}
              </ButtonGroup>

              {data?.videos?.results[0]?.key && (

                <Modal
                  closeAfterTransition
                  border
                  className={classes.modal}
                  open={open}
                  onClose={handleTrailerModalClose}
                >
                  <iframe
                    autoPlay
                    className={classes.video}
                    src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`}
                    allow="autoplay"
                    title="Trailer"
                  />
                </Modal>
              )}
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>

              <ButtonGroup variant="outlined" size="medium">

                <>
                  <Button
                    onClick={addToFavorites}
                    endIcon={
                    isFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                  >
                    Favorite
                  </Button>
                  <Button
                    onClick={addToWatchlist}
                    endIcon={isWatchListed ? <Remove /> : <PlusOne />}
                  >
                    Watchlist
                  </Button>
                </>

                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: 'primary.main' }}
                >
                  <Typography
                    style={{ textDecoration: 'none' }}
                    variant="subtitle1"
                    component={Link}
                    to="/"
                    color="inherit"
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        { recommendationsIsFetching ? (

          <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <CircularProgress size="8rem" />
          </Box>
        ) : (
          <>

            <Typography variant="h3" align="center" gutterBottom>
              You might also like
            </Typography>
            {recomendedData ? (
              <MovieList movies={recomendedData} numberOfMovies={12} />
            ) : (
              <Typography variant="h5" align="center" gutterBottom>
                No recommendations
              </Typography>
            )}
          </>
        )}
      </Box>
    </Grid>
  );
}

export default MovieInformation;
