import {
  GET_TOP_MOVIES,
  SEARCH_MOVIES,
  MOVIE_DETAIL,
  MOVIE_DETAIL_ERROR
} from "../actions/types";

const initialState = {
  topMovies: [],
  movieDetail: {}
};

export default function(state = initialState, action) {
  const existingMovies = state.topMovies ? state.topMovies : [];
  switch (action.type) {
    case GET_TOP_MOVIES:
      return {
        ...state,
        topMovies: [...existingMovies, ...action.payload]
      };
    case SEARCH_MOVIES:
      return {
        ...state,
        topMovies: action.payload
      };
    case MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: action.payload
      };
    default:
      return state;
  }
}
