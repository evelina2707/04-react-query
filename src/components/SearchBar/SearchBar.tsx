import toast from "react-hot-toast";
import css from './SearchBar.module.css'

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const query = (formData.get("query") as string).trim();

    if (!query) {
      toast.error("Please enter search query");
      return;
    }

    onSubmit(query);
  };

  return (
    <form className={css.form} action={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          placeholder="Search movies..."
        />

        <button className={css.button} type="submit">
          Search
        </button>
      </form>
  );
}