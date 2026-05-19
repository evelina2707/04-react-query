import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";



export default function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== '',
  });

  const movies = data ? data.results : [];
  const totalPages = data ? data.total_pages : 0;

  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.error('No movies found')
    }
  },[data])

  function handleSearch(newQuery: string) {
    setQuery(newQuery);
    setPage(1)
  }
      
  return (
    <div>
      <SearchBar onSubmit={handleSearch} />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
        ) : (
            <>
  {totalPages > 1 && (
    <Pagination
      totalPages={totalPages}
      currentPage={page}
      onPageChange={setPage}
    />
  )}

  <MovieGrid
    movies={movies}
    onSelect={setSelectedMovie}
  />
</>
      
      )}

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}