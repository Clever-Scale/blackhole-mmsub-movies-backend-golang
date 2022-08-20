import {
  Box,
  colors,
  Drawer,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { Link } from "react-router-dom";

export default function SideBar() {
  const theme = useTheme();
  return (
    <Drawer
      variant={"permanent"}
      sx={{ zIndex: 100, position: "fixed", height: "100%" }}
    >
      <DrawerHeader />
      <Stack
        sx={{ width: "100px", height: "100%", paddingY: theme.spacing(4) }}
        alignItems={"center"}
        spacing={2}
      >
        <StyledSidebarItem>
          <StyledLink to={"/"}>
            <DashboardIcon style={{ fontSize: 35 }} />
          </StyledLink>
        </StyledSidebarItem>
        <StyledSidebarItem>
          <StyledLink to={"/movies"}>
            <MovieIcon style={{ fontSize: 35 }} />
          </StyledLink>
        </StyledSidebarItem>
        <StyledSidebarItem>
          <StyledLink to={"/series"}>
            <MovieFilterIcon style={{ fontSize: 35 }} />
          </StyledLink>
        </StyledSidebarItem>
      </Stack>
    </Drawer>
  );
}

const StyledLink = styled(Link)(({ theme }) => ({
  color: colors.grey[700],
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

const StyledSidebarItem = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
