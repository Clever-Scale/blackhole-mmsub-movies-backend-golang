import { Box, Container } from "@mui/material";

import React from "react";
import { Outlet } from "react-router-dom";

function SeriesLayout() {
  return (
    <Box width={"100%"} height={"100%"}>
      <Container maxWidth={"xl"}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default SeriesLayout;
