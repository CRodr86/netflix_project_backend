import { useContext, useState, useEffect, useCallback } from "react";
import { Context } from "../../store/appContext";
import { Container, Row, Col, Stack } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./MoviesFirstPage.css";
import love from "../../assets/love.svg";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";
import ScrollToTop from "../utils/ScrollToTop";
import MovieItem from "./MovieItem";

const MovieInfo = () => {
  const { actions, store } = useContext(Context);
  const { rateMovie, getNlpRecommendations, getMovieById, setPage } = actions;
  const { movieInfo, nlpMoviesData } = store;

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [rating, setRating] = useState("");

  useEffect(() => {
    if (movieInfo && movieInfo.rating) {
      setRating(movieInfo.rating);
    }
  }, [movieInfo]);

  const handleDragStart = useCallback((e) => e.preventDefault(), []);

  const handleMovieClick = useCallback(
    (movieId) => {
      getNlpRecommendations(currentUser.id, movieId, "movie");
      getMovieById(movieId, currentUser.id);
      setPage("movieInfo");
    },
    [getNlpRecommendations, getMovieById, setPage, currentUser]
  );

  if (!movieInfo) {
    return (
      <Container>
        <h1>Movie Info</h1>
        <p>No movie selected.</p>
      </Container>
    );
  }

  const convertYouTubeURL = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <>
      {" "}
      <ScrollToTop />
      <Container className="movie-info-container">
        <Row>
          <Col md={4} className="movie-poster d-flex flex-column">
            {movieInfo.movie && movieInfo.movie.poster_url ? (
              <img
                src={movieInfo.movie.poster_url}
                alt={movieInfo.movie.title}
                style={{ width: "100%" }}
              />
            ) : (
              <div className="no-poster">No poster available</div>
            )}
            <Stack direction="horizontal" gap={3} className="mt-3">
              <p className="fs-5 mt-3">Rate this movie:</p>
              <img
                src={dislike}
                alt="No me gusta"
                className={`rating-icon ${
                  rating === "No me gusta" ? "selected" : ""
                }`}
                onClick={() => {
                  rating === "No me gusta"
                    ? rateMovie(currentUser.id, movieInfo.movie.id, "")
                    : rateMovie(
                        currentUser.id,
                        movieInfo.movie.id,
                        "No me gusta"
                      );
                  rating === "No me gusta"
                    ? setRating("")
                    : setRating("No me gusta");
                }}
              />
              <img
                src={like}
                alt="Me gusta"
                className={`rating-icon ${
                  rating === "Me gusta" ? "selected" : ""
                }`}
                onClick={() => {
                  rating === "Me gusta"
                    ? rateMovie(currentUser.id, movieInfo.movie.id, "")
                    : rateMovie(currentUser.id, movieInfo.movie.id, "Me gusta");
                  rating === "Me gusta" ? setRating("") : setRating("Me gusta");
                }}
              />
              <img
                src={love}
                alt="Me encanta"
                className={`rating-icon ${
                  rating === "Me encanta" ? "selected" : ""
                }`}
                onClick={() => {
                  rating === "Me encanta"
                    ? rateMovie(currentUser.id, movieInfo.movie.id, "")
                    : rateMovie(
                        currentUser.id,
                        movieInfo.movie.id,
                        "Me encanta"
                      );
                  rating === "Me encanta"
                    ? setRating("")
                    : setRating("Me encanta");
                }}
              />
            </Stack>
          </Col>
          <Col md={8} className="movie-details">
            <h1 className="movie-title">
              {movieInfo.movie && movieInfo.movie.title
                ? movieInfo.movie.title.toUpperCase()
                : "N/A"}
            </h1>
            <div className="movie-genres">
              {movieInfo.movie && movieInfo.movie.genres
                ? movieInfo.movie.genres
                    .split(",")
                    .map((genre, index) => <span key={index}>{genre}</span>)
                : "N/A"}
            </div>
            <div className="movie-info d-flex">
              <p>
                <strong>Year:</strong>{" "}
                {movieInfo.movie && movieInfo.movie.start_year
                  ? movieInfo.movie.start_year
                  : "N/A"}
              </p>
              <p className="mx-4">
                <strong>Age Rating:</strong>{" "}
                {movieInfo.movie && movieInfo.movie.age_rating
                  ? movieInfo.movie.age_rating
                  : "N/A"}
              </p>
              <p>
                <strong>Duration:</strong>{" "}
                {movieInfo.movie && movieInfo.movie.runtime_minutes
                  ? `${movieInfo.movie.runtime_minutes} minutes`
                  : "N/A"}{" "}
              </p>
            </div>
            <p>
              <strong>Country:</strong>{" "}
              {movieInfo.movie && movieInfo.movie.country
                ? movieInfo.movie.country
                : "N/A"}
            </p>
            <div className="movie-cast-crew">
              <h5>Director</h5>
              <p>
                {movieInfo.movie && movieInfo.movie.director
                  ? movieInfo.movie.director
                  : "N/A"}
              </p>
              <h5>Cast</h5>
              <p>
                {movieInfo.movie && movieInfo.movie.cast
                  ? movieInfo.movie.cast
                  : "N/A"}
              </p>
            </div>
            <div className="movie-synopsis">
              <h5>Synopsis</h5>
              <p>
                {movieInfo.movie && movieInfo.movie.description
                  ? movieInfo.movie.description
                  : "N/A"}
              </p>
            </div>
            {movieInfo.movie && movieInfo.movie.youtube_trailers && (
              <div className="movie-trailer">
                <h5>Trailer</h5>
                {movieInfo.movie.youtube_trailers
                  .split(", ")
                  .map((trailer, index) => (
                    <div key={index} className="mb-2">
                      <iframe
                        width="560"
                        height="315"
                        src={convertYouTubeURL(trailer)}
                        title={`Trailer ${index + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>{" "}
                    </div>
                  ))}
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Similar Movies</h2>
            <div className="similar-movies">
              <AliceCarousel
                mouseTracking
                items={nlpMoviesData.map((movie, idx) => (
                  <MovieItem
                    key={idx}
                    movie={movie}
                    handleDragStart={handleDragStart}
                    handleClick={() => handleMovieClick(movie.id)}
                  />
                ))}
                infinite
                disableDotsControls
                renderPrevButton={() => (
                  <button className="alice-carousel__prev-btn fs-3">‹</button>
                )}
                renderNextButton={() => (
                  <button className="alice-carousel__next-btn fs-3">›</button>
                )}
                responsive={{
                  0: { items: 2 },
                  512: { items: 3 },
                  1024: { items: 5 },
                  1280: { items: 7 },
                  1600: { items: 7 },
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MovieInfo;
