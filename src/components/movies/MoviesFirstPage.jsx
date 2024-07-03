import { useContext, useEffect, useState, useCallback } from "react";
import { Context } from "../../store/appContext";
import { Row, Col, Spinner } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./MoviesFirstPage.css";
import ScrollToTop from "../utils/ScrollToTop";
import MovieItem from "./MovieItem"; // Certifique-se de importar corretamente

const MoviesFirstPage = () => {
  const { actions, store } = useContext(Context);
  const { getMoviesData, getMovieById, setPage } = actions;
  const { moviesData } = store;
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const userGenres = JSON.parse(
    localStorage.getItem("user")
  ).favorite_genres.split(", ");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      getMoviesData(userId).then(() => setLoaded(true));
    }
  }, [loaded, getMoviesData, userId]);

  const handleDragStart = useCallback((e) => e.preventDefault(), []);

  const handleMovieClick = useCallback(
    (movieId) => {
      getMovieById(movieId, userId);
      setPage("movieInfo");
    },
    [getMovieById, setPage, userId]
  );

  if (!loaded) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <h1>Movies First Page</h1>
      {userGenres.map((genre, index) => (
        <div key={index}>
          <Row>
            <Col xs={12}>
              <h3 className="ms-2">{genre}</h3>
            </Col>
          </Row>
          <AliceCarousel
            mouseTracking
            items={moviesData[genre]?.map((movie, idx) => (
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
      ))}
    </>
  );
};

export default MoviesFirstPage;
