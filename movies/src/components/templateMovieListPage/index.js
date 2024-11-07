import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [languageFilter, setLanguageFilter] = useState("");
  const [starRateFilter, setStarRateFilter] = useState("");
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return starRateFilter ? m.vote_average >= Number(starRateFilter) : true;
    })
    .filter((m) => {
      if (releaseYearFilter === "2021 Before") {
        return new Date(m.release_date).getFullYear() < 2021;
      } else if (releaseYearFilter) {
        return new Date(m.release_date).getFullYear() === parseInt(releaseYearFilter);
      }
      return true; 
    })
    .filter((m) => (languageFilter ? m.original_language === languageFilter : true));

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "language") setLanguageFilter(value);
    else if (type === "starRate") setStarRateFilter(value);
    else if (type === "releaseYear") setReleaseYearFilter(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            languageFilter={languageFilter}
            starRateFilter={starRateFilter}
            releaseYearFilter={releaseYearFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;