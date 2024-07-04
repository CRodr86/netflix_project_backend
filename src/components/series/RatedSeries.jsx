import { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Row, Col, Spinner } from "react-bootstrap";
import "./SeriesFirstPage.css";
import ScrollToTop from "../utils/ScrollToTop";
import love from "../../assets/love.svg";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";

const RatedSeries = () => {
  const { actions, store } = useContext(Context);
  const { getUserSeriesRatings, getNlpRecommendations, getSerieById, setPage } =
    actions;
  const { ratedSeriesData } = store;

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(true);
  const [showNoRatingsMessage, setShowNoRatingsMessage] = useState(false);

  useEffect(() => {
    if (currentUser) {
      getUserSeriesRatings(Number(currentUser.id)).finally(() =>
        setLoading(false)
      );
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!ratedSeriesData || ratedSeriesData.length === 0) {
        setShowNoRatingsMessage(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [ratedSeriesData]);

  return (
    <>
      <ScrollToTop />
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <p className="fs-5">
            Aquí puedes ver las series que has valorado previamente
          </p>
        </Col>
      </Row>
      {loading ? (
        <Row className="justify-content-center align-items-center min-vh-50">
          <Spinner animation="border" />
        </Row>
      ) : ratedSeriesData && ratedSeriesData.length > 0 ? (
        <Row className="justify-content-center px-3">
          {ratedSeriesData.map((series, index) => (
            <Col
              xs={2}
              md={1}
              key={index}
              className="rated-poster-container px-1"
              style={{ position: "relative" }} // Ensure the parent is relative
            >
              {series.serie.poster_url ? (
                <>
                  {series.rating === "Me encanta" ? (
                    <img src={love} alt="Me encanta" className="rated-icon" />
                  ) : series.rating === "Me gusta" ? (
                    <img src={like} alt="Me gusta" className="rated-icon" />
                  ) : (
                    <img
                      src={dislike}
                      alt="No me gusta"
                      className="rated-icon"
                    />
                  )}
                  <img
                    src={series.serie.poster_url}
                    alt={series.serie.title}
                    className="w-100 rated-poster"
                    onClick={() => {
                      getNlpRecommendations(
                        currentUser.id,
                        series.serie.id,
                        "serie"
                      );
                      getSerieById(series.serie.id, currentUser.id);
                      setPage("serieInfo");
                    }}
                  />
                </>
              ) : (
                <>
                  <div className="rated-overlay">
                    <span>{series.rating}</span>
                  </div>

                  <div
                    className="w-100 h-100 bg-secondary d-flex
                    align-items-center justify-content-center
                    text-light fs-4 fw-bold text-center rated-poster"
                  >
                    {series.serie.title.toUpperCase()}
                  </div>
                </>
              )}
              <p className="w-100 pb-3 fw-bold text-center">
                {series.serie.title.toUpperCase()}
              </p>
            </Col>
          ))}
        </Row>
      ) : showNoRatingsMessage ? (
        <Row className="justify-content-center align-items-center text-center fs-3 min-vh-50">
          <p>Todavía no has valorado ninguna serie</p>
        </Row>
      ) : null}
    </>
  );
};

export default RatedSeries;
