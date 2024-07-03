import { useContext, useEffect, useState, useCallback } from "react";
import { Context } from "../../store/appContext";
import { Row, Col, Spinner } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./SeriesFirstPage.css";
import ScrollToTop from "../utils/ScrollToTop";
import SerieItem from "./SerieItem"; // Certifique-se de importar corretamente

const SeriesFirstPage = () => {
  const { actions, store } = useContext(Context);
  const { getSeriesData, getSerieById, setPage } = actions;
  const { seriesData } = store;
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const userGenres = JSON.parse(
    localStorage.getItem("user")
  ).favorite_genres.split(", ");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      getSeriesData(userId).then(() => setLoaded(true));
    }
  }, [loaded, getSeriesData, userId]);

  const handleDragStart = useCallback((e) => e.preventDefault(), []);

  const handleSerieClick = useCallback(
    (serieId) => {
      getSerieById(serieId, userId);
      setPage("serieInfo");
    },
    [getSerieById, setPage, userId]
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
      {userGenres.map((genre, index) => (
        <div key={index}>
          <Row>
            <Col xs={12}>
              <h3 className="ms-2">{genre}</h3>
            </Col>
          </Row>
          <AliceCarousel
            mouseTracking
            items={seriesData[genre]?.map((serie, idx) => (
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
      ))}
    </>
  );
};

export default SeriesFirstPage;
