import fetcher from "@apis/fetcher";
import { SearchMovieResponseInterface } from "@atoms/movieDb.atom";
import useSWR from "swr";
import { AllGenresResponseInterface } from "./useAllGenres";

const useSearchMovieWithTitle = (title: string, inCludeAdult = false) => {
	const API_KEY = "c6e84f9b84872a49a4f26020835b8700";
	let res = useSWR<SearchMovieResponseInterface>(
		`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}&include_adult=${inCludeAdult}`,
		fetcher
	);

	const genres_res = useSWR<AllGenresResponseInterface>(
		`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
		fetcher
	);

	if (res.data && genres_res.data) {
		res.data.results.map((movie) => {
			return (movie.genres = Array.isArray(genres_res.data?.genres)
				? genres_res.data?.genres.filter((genre) =>
						movie.genre_ids.includes(genre.id)
				  )
				: undefined);
		});
	}

	return res;
};

export { useSearchMovieWithTitle };
