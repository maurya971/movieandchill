import {
  GET_TOP_MOVIES,
  GET_TOP_MOVIES_ERROR,
  SEARCH_MOVIES,
  SEARCH_MOVIES_ERROR,
  MOVIE_DETAIL,
  MOVIE_DETAIL_ERROR
} from "./types";
import axios from "axios";

const MOVIE_DB_API_KEY = "b622a2864924accfac837f5b60b97b4e";
const MOVIE_DB_BASE_URL = "https://api.themoviedb.org/3";

const _createMovieDbUrl = (relativeUrl, queryParams) => {
  let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY}&language=en-US`;
  if (queryParams) {
    Object.keys(queryParams).forEach(
      paramName => (baseUrl += `&${paramName}=${queryParams[paramName]}`)
    );
  }
  return baseUrl;
};

export function getTopMovies(page) {
  const fullUrl = _createMovieDbUrl("/movie/top_rated", {
    page
  });
  return function(dispatch) {
    axios
      .get(fullUrl)
      .then(function(response) {
        dispatch({
          type: GET_TOP_MOVIES,
          payload: response.data.results
        });
      })
      .catch(function(error) {
        console.log(error);
        dispatch({
          type: GET_TOP_MOVIES_ERROR,
          payload: []
        });
      });
  };
}

export function searchMovies(query, page) {
  const fullUrl = _createMovieDbUrl("/search/movie", {
    query,
    page
  });
  return function(dispatch) {
    axios
      .get(fullUrl)
      .then(function(response) {
        dispatch({
          type: SEARCH_MOVIES,
          payload: response.data.results
        });
      })
      .catch(function(error) {
        console.log(error);
        dispatch({
          type: SEARCH_MOVIES_ERROR,
          payload: []
        });
      });
  };
}

export function getMovieDetail(query, page = 1) {
  const fullUrl = _createMovieDbUrl("/movie/" + query, {
    page
  });
  return function(dispatch) {
    axios
      .get(fullUrl)
      .then(function(response) {
        dispatch({
          type: MOVIE_DETAIL,
          payload: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
        dispatch({
          type: MOVIE_DETAIL_ERROR,
          payload: {}
        });
      });
  };
}
