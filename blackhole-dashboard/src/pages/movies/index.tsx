import { useState } from "react";
import { Button, Typography } from "@mui/material";
import appLanguageStore from "@atoms/appLanguage.atom";
import MainLayout from "@layouts/MainLayout";

function MoviePage() {
  return (
    <MainLayout>
      <Typography variant={"h2"}>Hello, Welcome to MMSub Movies</Typography>
    </MainLayout>
  );
}

export default MoviePage;
