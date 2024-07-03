import { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Row, Col, Spinner } from "react-bootstrap";
import "./SeriesFirstPage.css";
import ScrollToTop from "../utils/ScrollToTop";
import love from "../../assets/love.svg";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";

const RatedSeries = () => {
  const { actions, store } = useContext(Context);
  const { getUserSeriesRatings, getSerieById, setPage } = actions;
  const { ratedSeriesData } = store;

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    currentUser && getUserSeriesRatings(Number(currentUser.id));
  }, []);

  if (ratedSeriesData && ratedSeriesData.length > 0) {
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
      </>
    );
  } else {
    return (
      <Row className="justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" />
      </Row>
    );
  }
};

export default RatedSeries;
