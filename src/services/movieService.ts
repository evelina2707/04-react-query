import axios from "axios";
import type { Movie } from "../types/movie";

const TOKEN = import.meta.env.VITE_API_TOKEN;

export interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}

export async function fetchMovies(
  query: string,
  page: number
): Promise<MoviesResponse> {
  const res = await axios.get<MoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: "application/json",
      },
    }
  );

  return res.data;
}
