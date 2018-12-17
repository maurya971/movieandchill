import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getMovieDetail } from "../actions/movie-browser.actions";
import propTypes from "prop-types";
import Chip from "material-ui/Chip";
import {
  Card,
  CardActions,
  CardMedia,
  CardTitle,
  CardHeader,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

// These are inline styles
// You can pass styles as objects using this convention
const styles = {
  cardMedia: {
    maxHeight: 394,
    overflow: "hidden"
  },
  card: {
    cursor: "pointer",
    height: 400,
    overflow: "hidden"
  },
  bgImage: {
    width: "100%"
  },
  movieColumn: {
    marginBottom: 20
  },
  chip: {
    margin: 4
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap"
  }
};

class MovieDetialComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getMovieDetail(this.props.match.params.mvid);
  }

  render() {
    const detail = this.props.movieDetail;
    let prodLogo = "";
    let posterPath = "";
    if (
      detail &&
      detail.production_companies &&
      detail.production_companies.length > 0
    ) {
      prodLogo =
        "https://image.tmdb.org/t/p/w300" +
        detail.production_companies[0].logo_path;
      posterPath = "https://image.tmdb.org/t/p/w300" + detail.poster_path;
    }
    let genresCode = "";
    if (detail && detail.genres) {
      genresCode = detail.genres.map(obj => {
        return <Chip style={styles.chip}>{obj.name}</Chip>;
      });
    }

    return (
      <Row>
        <Col style={styles.movieColumn} xs={6} sm={6} md={6} lg={6}>
          <Card style={styles.card}>
            <CardMedia
              style={styles.cardMedia}
              overlay={
                <CardTitle title={detail.title} subtitle={detail.tagline} />
              }
            >
              <img src={posterPath} alt="" />
            </CardMedia>
          </Card>
        </Col>
        <Col style={styles.movieColumn} xs={6} sm={6} md={6} lg={6}>
          <Card>
            <CardHeader
              title={detail.title}
              subtitle={detail.overview}
              avatar={prodLogo}
            />
            <CardText>
              release_date
              <div style={styles.wrapper}>{genresCode}</div>
              <p>
                <strong>Language: </strong>
                {detail.spoken_languages ? detail.spoken_languages[0].name : ""}
              </p>
              <p>
                <strong>Release Date: </strong>
                {detail.release_date ? detail.release_date : ""}
              </p>
            </CardText>
          </Card>
        </Col>
      </Row>
    );
  }
}

MovieDetialComponent.mapStateToPropsopTypes = {
  getMovieDetail: propTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    movieDetail: state.movieBrowser.movieDetail
  };
};

export default connect(
  mapStateToProps,
  { getMovieDetail }
)(MovieDetialComponent);
