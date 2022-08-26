import {
	Autocomplete,
	Box,
	Button,
	colors,
	Container,
	createFilterOptions,
	Grid,
	Stack,
	styled,
	TextField,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
	Divider,
	AutocompleteInputChangeReason,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { StyledTipTap } from "@components/Common";
import { useSearchMovieWithTitle } from "@apis/movieDb";
import movieDBStore, {
	SearchMovieResponseInterface,
} from "@atoms/movieDb.atom";
import useAllGenres, {
	AllGenresResponseInterface,
} from "@apis/movieDb/useAllGenres";

function CreateMoviePage() {
	const theme = useTheme();
	const navigate = useNavigate();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const filter = createFilterOptions<any>();
	const keyword = movieDBStore((state) => state.keyword);
	const setKeyword = movieDBStore((state) => state.setKeyword);
	const setMovies = movieDBStore((state) => state.setSearchedMovies);
	const searchedMovies = movieDBStore((state) => state.searchedMovies);
	const selectedMovie = movieDBStore((state) => state.selectedMovie);
	const setSelectedMovie = movieDBStore((state) => state.setSelectedMovie);
	const [genres, setGenres] = React.useState<
		AllGenresResponseInterface["genres"]
	>([]);

	const movieSearchHandle = (
		e: React.SyntheticEvent,
		v: string,
		r: AutocompleteInputChangeReason
	) => {
		setKeyword(v);
	};

	const searchMovie = useSearchMovieWithTitle(keyword);
	const allGenres = useAllGenres();

	React.useEffect(() => {
		if (searchMovie.data) {
			setMovies(searchMovie.data.results);
		}
		if (selectedMovie?.genres) {
			setGenres(selectedMovie.genres);
		}
		if (!selectedMovie) {
			setGenres([]);
		}
	}, [
		searchMovie,
		setKeyword,
		keyword,
		searchedMovies,
		selectedMovie,
		setMovies,
	]);

	return (
		<Box width={"100%"} height={"100%"}>
			<Container maxWidth={"xl"} disableGutters>
				<Toolbar disableGutters>
					<MovieIcon style={{ color: theme.palette.secondary.main }} />
					<Box width={10} />
					<Typography variant="h6">Create Movie</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<Button
						variant="contained"
						color={"secondary"}
						startIcon={<ArrowBackIcon />}
						onClick={() => navigate(-1)}
					>
						Back
					</Button>
					<Outlet />
				</Toolbar>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Stack spacing={2}>
							<Box
								sx={{
									backgroundColor: "#fff",
									borderRadius: theme.spacing(1),
									boxShadow: `1px 1px 5px ${colors.grey[300]}`,
									p: 2,
								}}
							>
								<Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
									Search Movie Name
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={10}>
										<StyledAutoComplete
											getOptionLabel={(option: any) => option.title}
											disablePortal
											id="combo-box-demo"
											options={searchedMovies}
											size={"small"}
											renderInput={(params) => {
												return <StyledTextField {...params} label={"Movie"} />;
											}}
											isOptionEqualToValue={(opt, val) => {
												const option =
													opt as SearchMovieResponseInterface["results"][0];
												const value =
													val as SearchMovieResponseInterface["results"][0];

												return option.id === value.id;
											}}
											renderOption={(p, opt, st) => {
												const option =
													opt as SearchMovieResponseInterface["results"][0];
												return (
													<li
														style={{
															height: "90px",
															display: "flex",
															marginBottom: "10px",
														}}
														{...p}
														key={option.id}
													>
														<Box
															width={"60px"}
															height={"100%"}
															position={"relative"}
															sx={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
															}}
														>
															<img
																src={`https://image.tmdb.org/t/p/w200/${option.poster_path}`}
																alt=""
																style={{
																	position: "absolute",
																	width: "100%",
																	height: "auto",
																}}
															/>
														</Box>
														<Box
															sx={{
																height: "100%",
																display: "flex",
																flexDirection: "column",
																flexGrow: 1,
																justifyContent: "center",
																alignItems: "start",
																paddingX: theme.spacing(1),
															}}
														>
															<Typography variant={"subtitle2"}>
																{option.title}
															</Typography>
															<Typography variant={"caption"}>
																{option.release_date}
															</Typography>
														</Box>
													</li>
												);
											}}
											onInputChange={(e, v, r) => movieSearchHandle(e, v, r)}
											onChange={(e, v, r) => {
												var movie =
													v as SearchMovieResponseInterface["results"][0];

												setSelectedMovie(movie);
											}}
										/>
									</Grid>
									<Grid item xs={2}>
										<Button
											variant="contained"
											color={"secondary"}
											startIcon={<SearchIcon />}
											fullWidth
										>
											Search
										</Button>
									</Grid>
								</Grid>
							</Box>
							<Box
								sx={{
									backgroundColor: "#fff",
									borderRadius: theme.spacing(1),
									boxShadow: `1px 1px 5px ${colors.grey[300]}`,
									p: 2,
								}}
							>
								<Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
									Media
								</Typography>
								<Box
									sx={{
										border: `3px solid ${colors.grey[300]}`,
										borderStyle: "dotted",
										borderRadius: theme.spacing(1),
										width: "100%",
										height: "100%",
										display: "flex",
										justifyContent: "center",
										boxSizing: "border-box",
										alignItems: "center",
										py: 4,
									}}
								>
									<AddIcon fontSize="small" />
									<Typography variant="body2">Upload</Typography>
								</Box>
							</Box>
							<Box
								sx={{
									backgroundColor: "#fff",
									borderRadius: theme.spacing(1),
									boxShadow: `1px 1px 5px ${colors.grey[300]}`,
									p: 2,
								}}
							>
								<Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
									Movie Name
								</Typography>

								<Grid container spacing={2}>
									<Grid item xs={12}>
										<StyledTextField
											type={"text"}
											id="outlined-basic"
											label="Movie Name"
											variant="outlined"
											size="small"
											InputLabelProps={{ shrink: true }}
											value={selectedMovie?.title}
											disabled={selectedMovie ? true : false}
											fullWidth
										/>
									</Grid>
									<Grid item xs={8}>
										<StyledAutoComplete
											disablePortal
											id="combo-box-demo"
											options={allGenres.data?.genres ?? []}
											multiple
											getOptionLabel={(option: any) => option.name}
											filterSelectedOptions
											size={"small"}
											value={genres}
											onChange={(e, v, r) => {
												const value = v as AllGenresResponseInterface["genres"];
												setGenres(value);
											}}
											clearOnBlur
											filterOptions={(options: any, params: any) => {
												const filtered = filter(options, params);

												const { inputValue } = params;
												// Suggest the creation of a new value
												const isExisting = options.some(
													(option: any) => inputValue === option.name
												);
												if (inputValue !== "" && !isExisting) {
													filtered.push({
														name: inputValue,
													});
												}

												return filtered;
											}}
											handleHomeEndKeys
											renderInput={(params) => (
												<StyledTextField {...params} label="Select Genres" />
											)}
										/>
									</Grid>
									<Grid item xs={4}>
										<StyledTextField
											type={"text"}
											id="outlined-basic"
											label="Releacted Date"
											variant="outlined"
											size="small"
											InputLabelProps={{ shrink: true }}
											value={selectedMovie?.release_date}
											disabled={selectedMovie ? true : false}
											fullWidth
										/>
									</Grid>
									<Grid item xs={3}>
										<StyledTextField
											type={"text"}
											id="outlined-basic"
											label="Resolution"
											variant="outlined"
											size="small"
											fullWidth
										/>
									</Grid>
									<Grid item xs={3}>
										<StyledTextField
											type={"text"}
											id="outlined-basic"
											label="File Size"
											variant="outlined"
											size="small"
											fullWidth
										/>
									</Grid>
									<Grid item xs={3}>
										<StyledTextField
											type={"text"}
											id="outlined-basic"
											label="Duration"
											variant="outlined"
											size="small"
											fullWidth
										/>
									</Grid>
									<Grid item xs={3}>
										<StyledTextField
											type={"text"}
											InputLabelProps={{ shrink: true }}
											id="outlined-basic"
											label="IMDB Rating"
											variant="outlined"
											size="small"
											value={selectedMovie?.vote_average}
											disabled={selectedMovie ? true : false}
											fullWidth
										/>
									</Grid>
								</Grid>
							</Box>
							<Box
								sx={{
									backgroundColor: "#fff",
									borderRadius: theme.spacing(1),
									boxShadow: `1px 1px 5px ${colors.grey[300]}`,
									p: 2,
								}}
							>
								<Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
									Share Movie Link
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<Box>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													height: "100%",
												}}
											>
												<FacebookIcon sx={{ color: colors.blue[500] }} />
												<Typography variant="body2" sx={{ fontWeight: 600 }}>
													Facebook
												</Typography>
											</Box>
											<StyledTextField
												type={"text"}
												id="outlined-basic"
												label="Facebook Link"
												variant="outlined"
												size="small"
												fullWidth
											/>
										</Box>
									</Grid>
									<Grid item xs={12}>
										<Box>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													height: "100%",
												}}
											>
												<TelegramIcon sx={{ color: colors.blue[500] }} />
												<Typography variant="body2" sx={{ fontWeight: 600 }}>
													Telegram
												</Typography>
											</Box>
											<StyledTextField
												type={"text"}
												id="outlined-basic"
												label="Telegram Link"
												variant="outlined"
												size="small"
												fullWidth
											/>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Stack>
					</Grid>
					<Grid item xs={12} md={6}>
						<Stack spacing={2}>
							<Box
								sx={{
									backgroundColor: "#fff",
									width: "100%",
									borderRadius: theme.spacing(1),
									p: 2,
									boxSizing: "border-box",
								}}
							>
								<Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
									Movie Description
								</Typography>
								<StyledTipTap />
							</Box>
							<Box
								sx={{
									backgroundColor: "#fff",
									width: "100%",
									borderRadius: theme.spacing(1),
									boxSizing: "border-box",
									p: 2,
								}}
							>
								<Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
									Movie Translator
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12} lg={6}>
										<StyledTextField
											type={"text"}
											id="outlined-basic"
											label="Translator Name"
											variant="outlined"
											size="small"
											fullWidth
										/>
									</Grid>
									<Grid item xs={12} lg={6}>
										<StyledTextField
											type={"text"}
											id="outlined-basic"
											label="Encoder Name"
											variant="outlined"
											size="small"
											fullWidth
										/>
									</Grid>
								</Grid>
							</Box>
							<Box
								sx={{
									backgroundColor: "#fff",
									width: "100%",
									borderRadius: theme.spacing(1),
									boxSizing: "border-box",
									p: 2,
								}}
							>
								<Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
									Streaming Links
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<StyledTextField
											type={"text"}
											id="outlined-basic"
											label="Streaming Name"
											variant="outlined"
											size="small"
											fullWidth
										/>
									</Grid>
									<Grid item xs={6}>
										<StyledTextField
											type={"text"}
											id="outlined-basic"
											label="Streaming Links"
											variant="outlined"
											size="small"
											fullWidth
										/>
									</Grid>
									<Grid item xs={12}>
										<Divider sx={{ borderColor: `${colors.grey["300"]}` }} />
									</Grid>
									<Grid item xs={12}>
										<Box>
											<Button
												startIcon={<AddIcon />}
												color="secondary"
												variant="outlined"
											>
												Add Link
											</Button>
										</Box>
									</Grid>
								</Grid>
							</Box>
							<Box
								sx={{
									backgroundColor: "#fff",
									width: "100%",
									borderRadius: theme.spacing(1),
									boxSizing: "border-box",
									p: 2,
								}}
							>
								<Typography variant="subtitle1" sx={{ fontWeight: 700, pb: 1 }}>
									Download Links
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<StyledTextField
											type={"text"}
											id="outlined-basic"
											label="Download Name"
											variant="outlined"
											size="small"
											fullWidth
										/>
									</Grid>
									<Grid item xs={6}>
										<StyledTextField
											type={"text"}
											id="outlined-basic"
											label="Download Links"
											variant="outlined"
											size="small"
											fullWidth
										/>
									</Grid>
									<Grid item xs={12}>
										<Divider sx={{ borderColor: `${colors.grey["300"]}` }} />
									</Grid>
									<Grid item xs={12}>
										<Box>
											<Button
												startIcon={<AddIcon />}
												color="secondary"
												variant="outlined"
											>
												Add Link
											</Button>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Stack>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

const StyledTextField = styled(TextField)(({ theme }) => ({
	"& .MuiInputLabel-root": {
		color: "#000",

		"&.Mui-focused": {
			color: "#000",
		},
	},
	"& .MuiOutlinedInput-root": {
		"&.Mui-focused fieldset": {
			borderColor: theme.palette.secondary.main,
		},
	},
}));
const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
	width: "100%",
	"&.Mui-focused": {
		color: "#000",
		borderColor: "#000",
	},
	"& .MuiOutlinedInput-root": {
		"&.Mui-focused fieldset": {
			borderColor: theme.palette.secondary.main,
		},
	},
}));
const top100Films = [
	{ label: "The Shawshank Redemption", year: 1994 },
	{ label: "The Godfather", year: 1972 },
	{ label: "The Godfather: Part II", year: 1974 },
	{ label: "The Dark Knight", year: 2008 },
	{ label: "12 Angry Men", year: 1957 },
	{ label: "Schindler's List", year: 1993 },
	{ label: "Pulp Fiction", year: 1994 },
	{
		label: "The Lord of the Rings: The Return of the King",
		year: 2003,
	},
];
export default CreateMoviePage;
