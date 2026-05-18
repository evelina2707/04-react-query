import axios from "axios";
import type { Movie } from "../types/movie";

const TOKEN = import.meta.env.VITE_API_TOKEN;

interface MoviesResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const res = await axios.get<MoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: "application/json",
      },
    }
  );

  return res.data.results;
}