import { MovieTable } from "@components/Movies";
import {
	Box,
	Button,
	Container,
	Grid,
	Toolbar,
	Typography,
} from "@mui/material";
import MainLayout from "@layouts/MainLayout";
import withLayout from "@libs/withLayout";
import MovieIcon from "@mui/icons-material/Movie";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import MovieCard from "@components/Movies/MovieCard";

function MoviePage() {
	const arrays = Array.from({ length: 10 }, (_, i) => i);
	return (
		<Box width={"100%"} height={"100%"}>
			<Toolbar disableGutters>
				<MovieIcon />
				<Box width={10} />
				<Typography variant="h6">Movie</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<Box>
					<Link
						to={"create-movie"}
						style={{ textDecoration: "none", color: "#fff" }}
					>
						<Button
							variant="contained"
							color={"secondary"}
							startIcon={<AddIcon />}
						>
							Create
						</Button>
					</Link>
				</Box>
			</Toolbar>
			{/* Movie Table start */}
			<Grid container spacing={3} columns={{ lg: 14, md: 12 }}>
				{arrays.map((item, index) => (
					<Grid item xs={6} md={2} lg={2}>
						<MovieCard />
					</Grid>
				))}
			</Grid>
			{/* Movie Table end */}
		</Box>
	);
}

export default MoviePage;
