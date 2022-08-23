import React from "react";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MovieCard = () => {
	return (
		<Box sx={{ width: "100%" }}>
			<Stack
				position={"relative"}
				className={"w-full h-full bg-black box-border p-0 group"}
			>
				<Box
					className={
						"absolute h-full w-full top-0 left-0 bg-black bg-opacity-0 hover:bg-opacity-50 hidden justify-center items-center  group-hover:flex transition duration-600"
					}
				>
					<Stack spacing={2} direction={"row"}>
						<IconButton className={"bg-blue-600"}>
							<EditIcon className={"text-white"} fontSize={"small"} />
						</IconButton>
						<IconButton className="bg-red-600">
							<DeleteIcon className={"text-white"} fontSize={"small"} />
						</IconButton>
					</Stack>
				</Box>
				<img
					src="https://m.media-amazon.com/images/M/MV5BYmRiYjQ0OGQtYTAzMi00OGVjLWE4YTQtM2Q4YjBlZTBhMWM5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_.jpg"
					alt="Who am I"
					width={"100%"}
					className={
						"object-cover rounded-sm  bg-black bg-opacity-0 hover:bg-opacity-50"
					}
				/>
			</Stack>
			{/* Footer */}
			<Box sx={{ height: 5 }} />
			<Stack>
				<Typography
					variant={"subtitle2"}
					sx={{
						textOverflow: "ellipsis",
						overflow: "hidden",
						WebkitLineClamp: 1,
						lineClamp: 1,
						display: "-webkit-box",
						WebkitBoxOrient: "vertical",
					}}
				>
					Who am I
				</Typography>
				<Stack direction={"row"} spacing={1}>
					<Typography variant={"caption"}>Drama,</Typography>
					<Typography variant={"caption"}>Drama</Typography>
				</Stack>
			</Stack>
		</Box>
	);
};

export default MovieCard;
