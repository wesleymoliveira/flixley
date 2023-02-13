import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  featuredCardContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    height: '490px',
    textDecoration: 'none',
  },
  featuredCard: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  cardRoot: {
    position: 'relative',
  },
  featuredCardMedia: {
    width: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.575)',
    backgroundBlendMode: 'darken',
  },
  featuredCardContent: {
    color: '#fff',
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  featuredCardContentRoot: {
    padding: '0.5rem 1rem',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  featuredOverview: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 4,

  },

}));
