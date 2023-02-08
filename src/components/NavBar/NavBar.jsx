import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, IconButton, Toolbar, Button, Avatar, useMediaQuery, Drawer } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import { ColorModeContext } from '../../utils/ToggleColorMode';
import useStyles from './styles';
import Sidebar from '../Sidebar/Sidebar';
import Search from '../Search/Search';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { setUser, userSelector } from '../../features/auth';

function NavBar() {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);

  const colorMode = useContext(ColorModeContext);

  const token = localStorage.getItem('request_token');
  const localStorageSessionId = localStorage.getItem('session_id');

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (localStorageSessionId) {
          const { data } = await moviesApi.get(`/account?session_id=${localStorageSessionId}`);

          dispatch(setUser(data));
        } else {
          const sessionId = await createSessionId();
          const { data } = await moviesApi.get(`/account?session_id=${sessionId}`);

          dispatch(setUser(data));
        }
      }
    };
    logInUser();
  }, [token]);

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
            onClick={() => colorMode.toggleColorMode()}
            sx={{ ml: 1 }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {
            !isAuthenticated ? (
              <Button
                color="inherit"
                onClick={fetchToken}
              >
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
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
          {isMobile && <Search />}
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
