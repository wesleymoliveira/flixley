import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import useStyles from './styles';

import { Actors, Movies, MovieInformation, NavBar, Profile } from '.';
import useAlan from './Alan';

function App() {
  const classes = useStyles();
  const alanBtnInstance = useRef();
  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/approved" element={<Movies />} />
          <Route exact path="/movies/:id" element={<MovieInformation />} />
          <Route exact path="/actors/:id" element={<Actors />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route path="*" element={(<p>There&apos;s nothing here!</p>)} />
        </Routes>
      </main>
      <div ref={alanBtnInstance} />
    </div>
  );
}

export default App;
