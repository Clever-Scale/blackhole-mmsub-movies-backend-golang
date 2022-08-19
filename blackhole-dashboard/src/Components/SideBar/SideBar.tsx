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

export default function SideBar() {
  const theme = useTheme();
  return (
    <Drawer
      variant={"permanent"}
      sx={{ zIndex: 100, position: "fixed", height: "100%" }}
    >
      <DrawerHeader />
      <Stack
        sx={{ width: "130px", height: "100%", paddingY: theme.spacing(4) }}
        alignItems={"center"}
        spacing={2}
      >
        <StyledSidebarItem>
          <StyledSidebarLink>
            <DashboardIcon />
            <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
              Dashboard
            </Typography>
          </StyledSidebarLink>
        </StyledSidebarItem>
        <StyledSidebarItem>
          <StyledSidebarLink>
            <MovieIcon />
            <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
              Movies
            </Typography>
          </StyledSidebarLink>
        </StyledSidebarItem>
        <StyledSidebarItem>
          <StyledSidebarLink>
            <MovieFilterIcon />
            <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
              Series
            </Typography>
          </StyledSidebarLink>
        </StyledSidebarItem>
      </Stack>
    </Drawer>
  );
}

const StyledSidebarItem = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRight: `10px solid ${colors.blue[500]}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.grey[100],
  padding: "6px 0px",
}));

const StyledSidebarLink = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100px",
  justifyContent: "start",
  alignItems: "center",
  cursor: "pointer",
  gap: 4,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
