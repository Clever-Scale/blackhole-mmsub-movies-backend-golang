import { MovieTable } from "@components/Movies";
import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import MainLayout from "@layouts/MainLayout";
import withLayout from "@libs/withLayout";
import MovieIcon from "@mui/icons-material/Movie";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function MoviePage() {
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
      <MovieTable />
      {/* Movie Table end */}
    </Box>
  );
}

export default MoviePage;
