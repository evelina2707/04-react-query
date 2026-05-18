import type { Movie } from "../../types/movie";
import style from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (!movies.length) return null;

  return (
    <ul className={style.grid}>
      {movies.map((movie) => (
        <li
          key={movie.id}
          className={style.card}
          onClick={() => onSelect(movie)}
        >
          <img
            className={style.image}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-image.png"
            }
            alt={movie.title}
            loading="lazy"
          />
          <h2 className={style.title}>{movie.title}</h2>
        </li>
      ))}
    </ul>
  );
}