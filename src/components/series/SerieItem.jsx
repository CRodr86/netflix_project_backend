import React from "react";
import PropTypes from "prop-types";

const SerieItem = React.memo(({ serie, handleDragStart, handleClick }) => {
  return (
    <div
      onDragStart={handleDragStart}
      role="presentation"
      style={{ padding: "8px", boxSizing: "border-box" }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "2 / 3",
          overflow: "hidden",
          position: "relative",
        }}
        className="serie-carousel-image"
        onClick={handleClick}
      >
        {serie.poster_url ? (
          <img
            src={serie.poster_url}
            alt={serie.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "grey",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "bold",
              textAlign: "center",
              padding: "10px",
            }}
          >
            {serie.title.toUpperCase()}
          </div>
        )}
      </div>
      <p className="w-100 fw-bold text-center">{serie.title.toUpperCase()}</p>
    </div>
  );
});

// Adicionando nome de exibição
SerieItem.displayName = "SerieItem";

// Definindo tipos das props
SerieItem.propTypes = {
  serie: PropTypes.object.isRequired,
  handleDragStart: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default SerieItem;
