import { useContext, useState, useEffect, useCallback } from "react";
import { Context } from "../../store/appContext";
import { Container, Row, Col, Stack } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./SeriesFirstPage.css";
import love from "../../assets/love.svg";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";
import ScrollToTop from "../utils/ScrollToTop";
import SerieItem from "./SerieItem";

const SerieInfo = () => {
  const { actions, store } = useContext(Context);
  const { rateSerie, getNlpRecommendations, getSerieById, setPage } = actions;
  const { serieInfo, nlpSeriesData } = store;

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [rating, setRating] = useState("");

  useEffect(() => {
    if (serieInfo && serieInfo.rating) {
      setRating(serieInfo.rating);
    }
  }, [serieInfo]);

  const handleDragStart = useCallback((e) => e.preventDefault(), []);

  const handleSerieClick = useCallback(
    (serieId) => {
      getNlpRecommendations(currentUser.id, serieId, "serie");
      getSerieById(serieId, currentUser.id);
      setPage("serieInfo");
    },
    [getNlpRecommendations, getSerieById, setPage, currentUser]
  );

  if (!serieInfo) {
    return (
      <Container>
        <h1>Serie Info</h1>
        <p>No serie selected.</p>
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
      <Container className="serie-info-container">
        <Row>
          <Col md={4} className="serie-poster d-flex flex-column">
            {serieInfo.serie && serieInfo.serie.poster_url ? (
              <img
                src={serieInfo.serie.poster_url}
                alt={serieInfo.serie.title}
                style={{ width: "100%" }}
              />
            ) : (
              <div className="no-poster">No poster available</div>
            )}
            <Stack direction="horizontal" gap={3} className="mt-3">
              <p className="fs-5 mt-3">Rate this serie:</p>
              <img
                src={dislike}
                alt="No me gusta"
                className={`rating-icon ${
                  rating === "No me gusta" ? "selected" : ""
                }`}
                onClick={() => {
                  rating === "No me gusta"
                    ? rateSerie(currentUser.id, serieInfo.serie.id, "")
                    : rateSerie(
                        currentUser.id,
                        serieInfo.serie.id,
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
                    ? rateSerie(currentUser.id, serieInfo.serie.id, "")
                    : rateSerie(currentUser.id, serieInfo.serie.id, "Me gusta");
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
                    ? rateSerie(currentUser.id, serieInfo.serie.id, "")
                    : rateSerie(
                        currentUser.id,
                        serieInfo.serie.id,
                        "Me encanta"
                      );
                  rating === "Me encanta"
                    ? setRating("")
                    : setRating("Me encanta");
                }}
              />
            </Stack>
          </Col>
          <Col md={8} className="serie-details">
            <h1 className="serie-title">
              {serieInfo.serie && serieInfo.serie.title
                ? serieInfo.serie.title.toUpperCase()
                : "N/A"}
            </h1>
            <div className="serie-genres">
              {serieInfo.serie && serieInfo.serie.genres
                ? serieInfo.serie.genres
                    .split(",")
                    .map((genre, index) => <span key={index}>{genre}</span>)
                : "N/A"}
            </div>
            <div className="serie-info d-flex">
              <p>
                <strong>Year:</strong>{" "}
                {serieInfo.serie && serieInfo.serie.start_year
                  ? serieInfo.serie.start_year
                  : "N/A"}
              </p>
              <p className="mx-4">
                <strong>Age Rating:</strong>{" "}
                {serieInfo.serie && serieInfo.serie.age_rating
                  ? serieInfo.serie.age_rating
                  : "N/A"}
              </p>
              <p>
                <strong>Duration:</strong>{" "}
                {serieInfo.serie && serieInfo.serie.runtime_minutes
                  ? `${serieInfo.serie.runtime_minutes} minutes`
                  : "N/A"}{" "}
              </p>
            </div>
            <p>
              <strong>Country:</strong>{" "}
              {serieInfo.serie && serieInfo.serie.country
                ? serieInfo.serie.country
                : "N/A"}
            </p>
            <div className="serie-cast-crew">
              <h5>Director</h5>
              <p>
                {serieInfo.serie && serieInfo.serie.director
                  ? serieInfo.serie.director
                  : "N/A"}
              </p>
              <h5>Cast</h5>
              <p>
                {serieInfo.serie && serieInfo.serie.cast
                  ? serieInfo.serie.cast
                  : "N/A"}
              </p>
            </div>
            <div className="serie-synopsis">
              <h5>Synopsis</h5>
              <p>
                {serieInfo.serie && serieInfo.serie.description
                  ? serieInfo.serie.description
                  : "N/A"}
              </p>
            </div>
            {serieInfo.serie && serieInfo.serie.youtube_trailers && (
              <div className="serie-trailer">
                <h5>Trailer</h5>
                {serieInfo.serie.youtube_trailers
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
            <h2>Similar Series</h2>
            <div className="similar-series">
              <AliceCarousel
                mouseTracking
                items={nlpSeriesData.map((serie, idx) => (
                  <SerieItem
                    key={idx}
                    serie={serie}
                    handleDragStart={handleDragStart}
                    handleClick={() => handleSerieClick(serie.id)}
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

export default SerieInfo;
