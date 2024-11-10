import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AuthContextProvider, { useAuth } from "./contexts/authContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import MovieRecommendationsPage from "./pages/movieRecommendationsPage";
import MovieCreditsPage from "./pages/movieCreditsPage";
import ActorDetails from "./pages/actorDetails";
import WatchlistPage from "./pages/watchlistPage";
import LoginPage from "./pages/loginPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <MoviesContextProvider>
          <SiteHeader />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
              <Route path="/movies/favorites" element={<PrivateRoute element={<FavoriteMoviesPage />} />} />
              <Route path="/reviews/:movieId/:reviewId" element={<PrivateRoute element={<MovieReviewPage />} />} />
              <Route path="/movies/:id" element={<PrivateRoute element={<MoviePage />} />} />
              <Route path="/movie/:id/recommendations" element={<PrivateRoute element={<MovieRecommendationsPage />} />} />
              <Route path="/movie/:id/credits" element={<PrivateRoute element={<MovieCreditsPage />} />} />
              <Route path="/reviews/form" element={<PrivateRoute element={<AddMovieReviewPage />} />} />
              <Route path="/movies/upcoming" element={<PrivateRoute element={<UpcomingMoviesPage />} />} />
              <Route path="/movies/trending" element={<PrivateRoute element={<TrendingMoviesPage />} />} />
              <Route path="/movies/now_playing" element={<PrivateRoute element={<NowPlayingMoviesPage />} />} />
              <Route path="/watchlist" element={<PrivateRoute element={<WatchlistPage />} />} />
              <Route path="/actor/:id" element={<PrivateRoute element={<ActorDetails />} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
