import { useState } from "react";
import toast from "react-hot-toast";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  async function handleSearch(query: string) {
    setMovies([]);
    setLoading(true);
    setError(false);

    try {
      const results = await fetchMovies(query);

      if (!results.length) {
        toast.error("No movies found");
        return;
      }

      setMovies(results);
    } catch {
      toast.error("Something went wrong");
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <MovieGrid
          movies={movies}
          onSelect={setSelectedMovie}
        />
      )}

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}