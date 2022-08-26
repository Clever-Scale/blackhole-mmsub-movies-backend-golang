import create from "zustand";
import texts from "@localization/localization.json";

export interface SearchMovieResponseInterface {
	page: number;
	results: Result[];
	total_pages: number;
	total_results: number;
}

interface Result {
	adult: boolean;
	backdrop_path?: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path?: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	// CUSTOM GENRES
	genres?: {
		id: number;
		name: string;
	}[];
}

interface MovieDBAtomInterface {
	searchedMovies: SearchMovieResponseInterface["results"];
	keyword: string;
	selectedMovie?: SearchMovieResponseInterface["results"][0];

	setSearchedMovies(movies: SearchMovieResponseInterface["results"]): void;
	setKeyword(title: string): void;
	setSelectedMovie(movie: SearchMovieResponseInterface["results"][0]): void;
}

const movieDBStore = create<MovieDBAtomInterface>((set, get, sub) => ({
	searchedMovies: [],
	keyword: "Who am I",
	selectedMovie: undefined,

	setSearchedMovies(movies) {
		set((state) => ({ searchedMovies: movies }));
	},

	setKeyword(title) {
		set((state) => ({ keyword: title }));
	},

	setSelectedMovie(movie) {
		set((state) => ({ selectedMovie: movie }));
	},
}));

export default movieDBStore;
