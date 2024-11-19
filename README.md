# Assignment 1 - ReactJS app.

Name: Sihan Ma

## Overview.

This repository contains a ReactJS application developed as part of Assignment 1. The app leverages the TMDB API to display various movie-related features. It incorporates advanced functionality such as filtering, sorting, pagination, responsive design, and third-party authentication using Firebase. The application meets all 12 requirements outlined in the assignment specification.

---

### Features.

+ **Watchlist Functionality** - Users can add and remove movies from their personalized watchlist.
+ **Responsive UI Design** - Fully responsive layouts using Material-UI Grid for all components, ensuring usability on different screen sizes.
+ **React Query Integration** - Implemented caching with React Query for all static and parameterized endpoints to improve performance.
+ **Pagination** - Displayed movies are paginated for a smoother browsing experience.
+ **Filtering Options** - Users can filter movies by genre, language, star rating, release year, and title.
+ **Sorting Options** - Users can sort movies by title, release date, or rating in ascending or descending order.
+ **Dynamic Empty Slot Management** - In pages like favorites, empty slots dynamically fill to maintain consistent layout.
+ **Firebase Authentication** - Third-party authentication is integrated using Google Firebase for login/logout functionality.
+ **New Material-UI Components** - Including Pagination for navigating movie lists, Paper for enhancing visual hierarchy, Avatar for displaying user profile pictures, and Divider for adding structural separation between content sections.
+ **Extensive Linking** - Movie details page links to actor details, recommendations, and similar movies.
+ **Custom Theming** - Applied Material-UI theming to customize the app's appearance.
+ **Static and Dynamic Endpoints** - Fetch and cache data from multiple TMDB endpoints.

---

## Setup requirements.

1. Clone the repository:
   ```bash
   git clone https://github.com/HanGRQ/react-movie-labs.git
   ```
2. Navigate to the project directory:
   ```bash
   cd movies
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory and add your TMDB API key:
     ```bash
     REACT_APP_TMDB_KEY=[Your TMDB API Key]
     ```
5. Start the development server:
   ```bash
   npm start
   ```

---

## API endpoints.

+ **Discover Movies** - `/discover/movie`: Fetches a list of movies based on various filters.

  **Movie Genres** - `/genre/movie/list`: Retrieves the list of movie genres.

  **Movie Details** - `/movie/:id`: Retrieves detailed information about a specific movie.

  **Movie Recommendations** - `/movie/:id/recommendations`: Fetches a list of recommended movies similar to a specific movie.

  **Similar Movies** - `/movie/:id/similar`: Fetches movies similar to a specific movie.

  **Movie Credits** - `/movie/:id/credits`: Retrieves the cast and crew information of a specific movie.

  **Movie Reviews** - `/movie/:id/reviews`: Fetches user reviews for a specific movie.

  **Movie Images** - `/movie/:id/images`: Retrieves posters and images related to a specific movie.

  **Trending Movies** - `/trending/movie/week`: Fetches a list of trending movies for the current week.

  **Now Playing Movies** - `/movie/now_playing`: Fetches a list of movies currently playing in theatres.

  **Upcoming Movies** - `/movie/upcoming`: Retrieves a list of movies that are set to release soon.

  **Actor Details** - `/person/:id`: Retrieves detailed information about a specific actor.

  **Actor Movies** - `/person/:id/movie_credits`: Fetches movies associated with a specific actor (e.g., roles they’ve played).

---

## Routing.

+ **/login** - Displays the login page for user authentication.
+ **/** - Displays the home page with trending or featured movies (requires authentication).
+ **/movies/favorites** - Displays the user's list of favorite movies (requires authentication).
+ **/movies/upcoming** - Displays a list of upcoming movies (requires authentication).
+ **/movies/trending** - Displays a list of trending movies (requires authentication).
+ **/movies/now_playing** - Displays a list of movies currently playing in theatres (requires authentication).
+ **/watchlist** - Displays the user's watchlist of movies to be watched (requires authentication).
+ **/movies/:id**\- Displays detailed information about a specific movie (requires authentication).
+ **/movie/:id/recommendations**\- Displays recommended movies based on a specific movie (requires authentication).
+ **/movie/:id/credits** \- Displays the cast and crew information of a specific movie (requires authentication).
+ **/reviews/:movieId/:reviewId**\- Displays a detailed review for a specific movie (requires authentication).
+ **/reviews/form** - Provides a form for users to submit their own movie reviews (requires authentication).
+ **/actor/:id**\- Displays detailed information about a specific actor, including their associated movies (requires authentication).
+ ***** - Redirects all undefined routes to the login page.

### Authentication

- Protected Routes:
  - The following routes require the user to be authenticated:
    - `/`, `/movies/favorites`, `/movies/:id`, `/movie/:id/recommendations`, `/movie/:id/credits`, `/reviews/:movieId/:reviewId`, `/reviews/form`, `/movies/upcoming`, `/movies/trending`, `/movies/now_playing`, `/watchlist`, `/actor/:id`.
- Public Routes:
  - `/login` is the only public route available for unauthenticated users.

---

## Independent learning.

This project required independent research and implementation of several new concepts and technologies not covered in the course. These include:

1. **React Query**:
   - Used to fetch and cache data from TMDB API endpoints.
   - Files: `api/tmdb-api.js`, `favoriteMoviesPage.js`, `templateMoviePage.js`
   - References: 
     - [React Query Documentation](https://react-query.tanstack.com/)

2. **Firebase Authentication**:
   - Implemented Google login and logout functionality using Firebase.
   - Files: `contexts/authContext.js`, `loginPage.js`
   - References:
     - [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)

3. **Material-UI Components**:
   - Added advanced components like Accordion, Tabs, and Paper for better UI/UX.
   - Files: `filterMoviesCard.js`, `templateMovieListPage.js`
   - References:
     - [Material-UI Documentation](https://mui.com/)

4. **Responsive Layouts**:
   - Ensured all components and pages are responsive using Material-UI's Grid system.
   - Files: `templateMoviePage.js`, `pageTemplate.js`
   - References:
     - [Responsive Grid Documentation](https://mui.com/system/grid/)

5. **Dynamic Layout Management**:
   - Added logic to handle dynamic empty slot management for pages like favorites.
   - Files: `templateMoviePage.js`, `favoriteMoviesPage.js`
   - References:
     - [CSS Flexbox and Grid Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

