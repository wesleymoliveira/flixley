import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

function FeaturedMovie({ movie }) {
  const classes = useStyles();

  if (!movie) return null;

  return (
    <Box component={Link} to={`/movie/${movie.id}`} className={classes.featuredCardContainer}>
      <Card className={classes.featuredCard} classes={{ root: classes.cardRoot }}>
        <CardMedia className={classes.featuredCardMedia} media="picture" alt={movie.title} title={movie.title} image={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
        <Box padding="20px">
          <CardContent className={classes.featuredCardContent} classes={{ root: classes.featuredCardContentRoot }}>
            <Typography variant="h5" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body2" className={classes.featuredOverview}>
              {movie.overview}
            </Typography>
          </CardContent>
        </Box>

      </Card>
    </Box>
  );
}

export default FeaturedMovie;
