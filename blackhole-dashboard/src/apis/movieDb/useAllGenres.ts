import fetcher from "@apis/fetcher";
import { SearchMovieResponseInterface } from "@atoms/movieDb.atom";
import useSWR from "swr";

export interface AllGenresResponseInterface {
	genres: Genre[];
}

interface Genre {
	id: number;
	name: string;
}

const useAllGenres = () => {
	const API_KEY = "c6e84f9b84872a49a4f26020835b8700";
	const res = useSWR<AllGenresResponseInterface>(
		`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
		fetcher
	);

	return res;
};

export default useAllGenres;
