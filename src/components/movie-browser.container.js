import React from "react";
import { connect } from "react-redux";
import { AppBar } from "material-ui";
import { Router, Switch, Route } from "react-router-dom";
import propTypes from "prop-types";
import { getTopMovies, searchMovies } from "../actions/movie-browser.actions";
import * as movieHelpers from "./movie-browser.helpers";
import * as scrollHelpers from "./scroll.helpers";
import MovieListComponent from "./movie-list.container";
import history from "./History";
import MovieDetialComponent from "./movie-detail.component";

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleSearchMovie = this.handleSearchMovie.bind(this);
  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.props.getTopMovies(this.state.currentPage);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleSearchMovie(e) {
    this.setState({ currentPage: 0 });
    const page = 1;
    let query = e.target.value;
    this.props.searchMovies(query, page);
  }
  handleScroll() {
    const { topMovies } = this.props;
    if (!topMovies.isLoading) {
      let percentageScrolled = scrollHelpers.getScrollDownPercentage(window);
      if (percentageScrolled > 0.8) {
        const nextPage = this.state.currentPage + 1;
        this.props.getTopMovies(nextPage);
        this.setState({ currentPage: nextPage });
      }
    }
  }

  render() {
    let movies = [];
    let list = this.props.topMovies;
    if (list.length > 0) {
      movies = movieHelpers.getMoviesList(list);
    }

    return (
      <div>
        <AppBar title="Movies and chill" />

        <Router history={history}>
          <Switch>
            <PropsRoute
              path="/"
              exact
              strict
              component={MovieListComponent}
              handleSearchMovie={this.handleSearchMovie}
              movies={movies}
              isLoading={false}
            />
            <PropsRoute
              path="/detail/:mvid"
              exact
              strict
              component={MovieDetialComponent}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

MovieBrowser.mapStateToPropsopTypes = {
  getTopMovies: propTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    topMovies: state.movieBrowser.topMovies
  };
};

export default connect(
  mapStateToProps,
  { getTopMovies, searchMovies }
)(MovieBrowser);
