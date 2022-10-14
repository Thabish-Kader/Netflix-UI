const API_KEY = "1c4fc753b5eebd695bdf7661da22ac9c";

export const requestMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
export const requestUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
export const requestNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
export const requestLatest = `https://api.themoviedb.org/3/movie/latest?api_key=${API_KEY}&language=en-US`;
