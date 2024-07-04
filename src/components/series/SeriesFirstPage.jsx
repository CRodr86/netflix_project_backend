import { useContext, useEffect, useState, useCallback } from "react";
import { Context } from "../../store/appContext";
import { Row, Col, Spinner } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./SeriesFirstPage.css";
import ScrollToTop from "../utils/ScrollToTop";
import SerieItem from "./SerieItem";

const SeriesFirstPage = () => {
  const { actions, store } = useContext(Context);
  const {
    getSeriesData,
    getLastRatedSerie,
    getNlpRecommendations,
    getSerieById,
    setPage,
  } = actions;
  const { seriesData, lastRatedSerie, lastNlpSeriesData } = store;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const userGenres = user.favorite_genres.split(", ");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getSeriesData(userId);
      await getLastRatedSerie(userId);
      setLoaded(true);
    };

    if (!loaded) {
      fetchData();
    }
  }, [loaded, getSeriesData, userId, getLastRatedSerie]);

  const handleDragStart = useCallback((e) => e.preventDefault(), []);

  const handleSerieClick = useCallback(
    (serieId) => {
      getNlpRecommendations(userId, serieId, "serie");
      getSerieById(serieId, userId);
      setPage("serieInfo");
    },
    [getNlpRecommendations, getSerieById, setPage, userId]
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
      <h1>Series First Page</h1>
      {lastRatedSerie &&
        lastRatedSerie.title &&
        Array.isArray(lastNlpSeriesData) &&
        lastNlpSeriesData.length > 0 && (
          <>
            <Row className="justify-content-center">
              <Col xs={12} className="text-center">
                <h3 className="ms-2">
                  Because you like {lastRatedSerie.title.toUpperCase()}
                </h3>
              </Col>
            </Row>
            <AliceCarousel
              mouseTracking
              items={lastNlpSeriesData.map((serie, idx) => (
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
          </>
        )}
      {userGenres.map((genre, index) => (
        <div key={index}>
          <Row>
            <Col xs={12}>
              <h3 className="ms-2">{genre}</h3>
            </Col>
          </Row>
          {Array.isArray(seriesData[genre]) && seriesData[genre].length > 0 && (
            <AliceCarousel
              mouseTracking
              items={seriesData[genre].map((serie, idx) => (
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
          )}
        </div>
      ))}
    </>
  );
};

export default SeriesFirstPage;
