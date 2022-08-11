import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Button, Avatar, useMediaQuery, Drawer } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import useStyles from './styles';
import { Sidebar } from '..';

function NavBar() {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {
        isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ outline: 'none' }}
            onClick={() => setMobileOpen((prevState) => !prevState)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )
      }
          <IconButton
            color="inherit"
            onClick={() => {}}
            sx={{ ml: 1 }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && 'TODO Search'}
          <div>
            {
            !isAuthenticated ? (
              <Button
                color="inherit"
                onClick={() => {}}
              >
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/profile/idblabla"
                className={classes.linlButton}
                onClick={() => {}}
              >
                {
                  !isMobile
                  && <>My Movies &nbsp;</>
                }
                <Avatar
                  style={isMobile ? { width: '30px', height: '30px' } : { width: '40px', height: '40px' }}
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  alt="avatar"
                />
              </Button>
            )
          }
          </div>
          {isMobile && 'TODO Search'}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {
          isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              // it's not recommended to use the prev state directly than I'm usign a callback function
              onClose={() => setMobileOpen((prevState) => !prevState)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )
        }

        </nav>
      </div>
    </>

  );
}

export default NavBar;
