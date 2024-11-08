import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [languageFilter, setLanguageFilter] = useState("");
  const [starRateFilter, setStarRateFilter] = useState("");
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  
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

  // 分页处理
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMovies = displayedMovies.slice(startIndex, endIndex);

  // 处理分页变更
  const handleChangePage = (event, value) => {
    setPage(value);
  };
    
  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "language") setLanguageFilter(value);
    else if (type === "starRate") setStarRateFilter(value);
    else if (type === "releaseYear") setReleaseYearFilter(value);
  };

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1, padding: "20px" }}>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container spacing={2}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 5, md: 3, lg: 3}} 
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

        <Grid size={{xs: 12, sm: 9, md: 9, lg: 9}}>
          <MovieList action={action} movies={paginatedMovies}></MovieList>
        </Grid>

        <Grid container justifyContent="center" alignItems="center"
          sx={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            padding: "10px",
            boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <Pagination
            count={Math.ceil(displayedMovies.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size="large"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;