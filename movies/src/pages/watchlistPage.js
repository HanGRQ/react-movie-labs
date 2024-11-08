import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";

const WatchlistPage = () => {
  const { watchlist: movieIds } = useContext(MoviesContext);

  const watchlistMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    }))
  );

  const isLoading = watchlistMovieQueries.find((q) => q.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = watchlistMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="My Watchlist"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromWatchlist movie={movie} />
        </>
      )}
    />
  );
};

export default WatchlistPage;
