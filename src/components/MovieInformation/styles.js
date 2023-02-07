import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  containerSpaceRound: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0 !important',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  },
  poster: {
    borderRadius: '20px',
    boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
    margin: '30px auto',
    maxHeight: '450px',

    [theme.breakpoints.up('xl')]: {
      maxHeight: '650px',
    },

  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem 1rem',
    },
  },
  genresContainer: {
    margin: '10px 0 !important',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
    marginRight: '10px',
    marginLeft: '10px',
  },
  castImage: {
    width: '100%',
    maxWidth: '6em',
    height: '8em',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '50%',
    height: '50%',
    borderWidth: '0',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: '90%',
    },
  },
}));
