import { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Row, Col, Spinner, Tabs, Tab } from "react-bootstrap";
import "./MoviesFirstPage.css";
import ScrollToTop from "../utils/ScrollToTop";
import love from "../../assets/love.svg";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";
import RatedSeries from "../series/RatedSeries";

const RatedMovies = () => {
  const { actions, store } = useContext(Context);
  const { getUserMoviesRatings, getNlpRecommendations, getMovieById, setPage } =
    actions;
  const { ratedMoviesData } = store;

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(true);
  const [showNoRatingsMessage, setShowNoRatingsMessage] = useState(false);

  useEffect(() => {
    if (currentUser) {
      getUserMoviesRatings(Number(currentUser.id)).finally(() =>
        setLoading(false)
      );
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!ratedMoviesData || ratedMoviesData.length === 0) {
        setShowNoRatingsMessage(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [ratedMoviesData]);

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <h1>Mis valoraciones</h1>
        </Col>
      </Row>
      <Tabs
        defaultActiveKey="rated-movies"
        id="rated-tab"
        variant="pills"
        className="my-2 d-flex justify-content-center"
      >
        <Tab eventKey="rated-movies" title="Películas">
          <ScrollToTop />
          <Row className="justify-content-center">
            <Col xs={12} md={6} className="text-center">
              <p className="fs-5">
                Aquí puedes ver las películas que has valorado previamente
              </p>
            </Col>
          </Row>
          {loading ? (
            <Row className="justify-content-center align-items-center min-vh-50">
              <Spinner animation="border" />
            </Row>
          ) : ratedMoviesData && ratedMoviesData.length > 0 ? (
            <Row className="justify-content-center px-3">
              {ratedMoviesData.map((movies, index) => (
                <Col
                  xs={2}
                  md={1}
                  key={index}
                  className="rated-poster-container px-1"
                  style={{ position: "relative" }} // Ensure the parent is relative
                >
                  {movies.movie.poster_url ? (
                    <>
                      {movies.rating === "Me encanta" ? (
                        <img
                          src={love}
                          alt="Me encanta"
                          className="rated-icon"
                        />
                      ) : movies.rating === "Me gusta" ? (
                        <img src={like} alt="Me gusta" className="rated-icon" />
                      ) : (
                        <img
                          src={dislike}
                          alt="No me gusta"
                          className="rated-icon"
                        />
                      )}
                      <img
                        src={movies.movie.poster_url}
                        alt={movies.movie.title}
                        className="w-100 rated-poster"
                        onClick={() => {
                          getNlpRecommendations(
                            currentUser.id,
                            movies.movie.id,
                            "movie"
                          );
                          getMovieById(movies.movie.id, currentUser.id);
                          setPage("movieInfo");
                        }}
                      />
                    </>
                  ) : (
                    <>
                      {movies.rating === "Me encanta" ? (
                        <img
                          src={love}
                          alt="Me encanta"
                          className="rated-icon"
                        />
                      ) : movies.rating === "Me gusta" ? (
                        <img src={like} alt="Me gusta" className="rated-icon" />
                      ) : (
                        <img
                          src={dislike}
                          alt="No me gusta"
                          className="rated-icon"
                        />
                      )}
                      <div
                        className="w-100 h-100 bg-secondary d-flex
                        align-items-center justify-content-center
                        text-light fs-4 fw-bold text-center rated-poster"
                        onClick={() => {
                          getNlpRecommendations(
                            currentUser.id,
                            movies.movie.id,
                            "movie"
                          );
                          getMovieById(movies.movie.id, currentUser.id);
                          setPage("movieInfo");
                        }}
                      >
                        {movies.movie.title.toUpperCase()}
                      </div>
                    </>
                  )}
                  <p className="w-100 pb-3 fw-bold text-center">
                    {movies.movie.title.toUpperCase()}
                  </p>
                </Col>
              ))}
            </Row>
          ) : showNoRatingsMessage ? (
            <Row className="justify-content-center align-items-center text-center fs-3 min-vh-50">
              <p>Todavía no has valorado ninguna película</p>
            </Row>
          ) : null}
        </Tab>
        <Tab eventKey="rated-series" title="Series">
          <RatedSeries />
        </Tab>
      </Tabs>
    </>
  );
};

export default RatedMovies;
