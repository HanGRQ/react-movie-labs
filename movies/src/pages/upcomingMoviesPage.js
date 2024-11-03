import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToWatchlistIcon from '../components/cardIcons/addToWatchlist'; 
const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUpcomingMovies()
      .then((movies) => {
        setMovies(movies);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching upcoming movies:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <AddToWatchlistIcon movie={movie} /> 
          </>
        );
      }}
    />
  );
};

export default UpcomingMoviesPage;
