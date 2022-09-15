/* eslint-disable no-param-reassign */
// eslint rule deactivated: in redux toolkit it's the right way https://redux-toolkit.js.org/api/createSlice
import { createSlice } from '@reduxjs/toolkit';

export const genreIdOrCategoryName = createSlice({
  name: 'genreIdOrCategoryName',
  initialState: {
    genreIdOrCategoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreIdOrCategoryName: (state, action) => {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = '';
    },
  },
});

export const { selectGenreIdOrCategoryName } = genreIdOrCategoryName.actions;
export default genreIdOrCategoryName.reducer;
