import React from "react";
import PropTypes from "prop-types";

const MovieItem = React.memo(({ movie, handleDragStart, handleClick }) => {
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
        className="movie-carousel-image"
        onClick={handleClick}
      >
        {movie.poster_url ? (
          <img
            src={movie.poster_url}
            alt={movie.title}
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
            {movie.title.toUpperCase()}
          </div>
        )}
      </div>
      <p className="w-100 fw-bold text-center">{movie.title.toUpperCase()}</p>
    </div>
  );
});

// Adicionando nome de exibição
MovieItem.displayName = "MovieItem";

// Definindo tipos das props
MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  handleDragStart: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default MovieItem;
