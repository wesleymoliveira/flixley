import React from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

import { selectGenreIdOrCategoryName } from '../../features/currentGenreIdOrCategoryName';
import { useGetGenresQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';

const mockCategories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' }];

function Sidebar() {
  const theme = useTheme();
  const classes = useStyles();

  const { data, isFetching, isLoading } = useGetGenresQuery();
  const dispatch = useDispatch();

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img src={theme.palette.mode === 'light' ? '/logo_blue.png' : '/logo_red.png'} alt="Flixley logo" style={{ maxHeight: 65 }} />
      </Link>
      <Divider />
      <List>
        <ListSubheader>
          Categories
        </ListSubheader>
        {mockCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => dispatch(selectGenreIdOrCategoryName(value))} button>
              <ListItemIcon>
                <img src={`${genreIcons[label.toLowerCase()]}`} className={classes.genreImages} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}

      </List>
      <Divider />
      <List>
        <ListSubheader>
          Genres
        </ListSubheader>
        {!isFetching || !isLoading ? data.genres.map(({ name, id }) => (
          <Link key={id} className={classes.links} to="/">
            <ListItem onClick={() => dispatch(selectGenreIdOrCategoryName(id))} button>
              <ListItemIcon>
                <img src={`${genreIcons[name.toLowerCase()]}`} className={classes.genreImages} height={30} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))
          : (
            <Box display="flex" justifyContent="center">
              <CircularProgress size="4rem" />
            </Box>
          )}
      </List>
    </>
  );
}

export default Sidebar;
