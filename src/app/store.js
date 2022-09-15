import { configureStore } from '@reduxjs/toolkit';

import { tmdbApi } from '../services/TMDB';
import genreIdOrCategoryReducer from '../features/currentGenreIdOrCategoryName';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreIdOrCategoryName: genreIdOrCategoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),

});
