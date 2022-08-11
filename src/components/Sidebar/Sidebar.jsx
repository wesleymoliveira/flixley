import React from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import useStyles from './styles';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const mockCategories = [
  { label: 'Comedy', value: 'comedy' },
  { label: 'Action', value: 'action' },
  { label: 'Drama', value: 'drama' }];

function Sidebar() {
  const theme = useTheme();
  const classes = useStyles();

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
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img src="/logo_red.png" className={classes.genreImages} height={30} />
              </ListItemIcon> */}
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
        {mockCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img src="/logo_red.png" className={classes.genreImages} height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}

export default Sidebar;
