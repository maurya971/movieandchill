import React from "react";
import TextField from "material-ui/TextField";
import { Grid, Row, Col } from "react-bootstrap";
import MovieList from "./movie-list.component";

function MovieListComponent(props) {
  return (
    <Grid>
      <Row>
        <TextField
          hintText="Search movie title"
          onChange={props.handleSearchMovie}
        />
      </Row>
      <Row>
        <MovieList movies={props.movies} isLoading={props.isLoading} />
      </Row>
    </Grid>
  );
}

export default MovieListComponent;
