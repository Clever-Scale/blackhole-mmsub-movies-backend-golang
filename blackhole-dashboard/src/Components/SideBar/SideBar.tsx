import { Box, Drawer, Stack, styled, useTheme } from "@mui/material";
import React from "react";

export default function SideBar() {
	const theme = useTheme();
	return (
		<Drawer
			variant={"permanent"}
			sx={{ zIndex: 100, position: "fixed", height: "100%" }}
		>
			<DrawerHeader />
			<Stack
				sx={{ width: "100px", height: "100%", paddingY: theme.spacing(2) }}
				alignItems={"center"}
			>
				SideBar
			</Stack>
		</Drawer>
	);
}

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));
