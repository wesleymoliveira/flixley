import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, useMediaQuery } from '@mui/material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { Link } from 'react-router-dom';

import useStyles from './styles';

function FeaturedMovie({ movie }) {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');

  if (!movie) return null;

  const imgSrc = isMobile ? movie.poster_path : movie.backdrop_path;

  return (
    <Box component={Link} to={`/movie/${movie.id}`} className={classes.featuredCardContainer}>
      <Card className={classes.featuredCard} classes={{ root: classes.cardRoot }}>
        <CardMedia className={classes.featuredCardMedia} media="picture" alt={movie.title} title={movie.title} image={`https://image.tmdb.org/t/p/original/${imgSrc}`} />
        <Box padding="20px">
          <MilitaryTechIcon className={classes.featuredIcon} />
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
