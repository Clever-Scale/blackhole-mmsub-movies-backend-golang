import { alpha, Box, Container, styled, useTheme } from "@mui/material";
import React from "react";
import Header from "@components/Header";
import SideBar from "@components/SideBar";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout() {
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Header />
      <SideBar />
      <Offset />
      <Box
        sx={{
          marginLeft: "100px",
          width: "calc(100%_-_100px)",
          minHeight: "calc(100% - 64px)",
          padding: theme.spacing(4),
          boxSizing: "border-box",
          backgroundColor: alpha(theme.palette.common.black, 0.07),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

const Offset = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));
