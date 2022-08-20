import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import viteLogo from "../public/vite.svg";
import "./App.css";
import { Button, Typography } from "@mui/material";
import appLanguageStore from "@atoms/appLanguage.atom";
import MainLayout from "@layouts/MainLayout";
import { useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { CreateMoviePage, MovieLayout, MoviePage } from "./pages/movies";
import { SeriesLayout, SeriesPage } from "./pages/series";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <MainLayout />,

      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "movies",
          element: <MovieLayout />,
          children: [
            {
              index: true,
              element: <MoviePage />,
            },
            {
              path: "create-movie",
              element: <CreateMoviePage />,
            },
          ],
        },
        {
          path: "series",
          element: <SeriesLayout />,
          children: [
            {
              index: true,
              element: <SeriesPage />,
            },
          ],
        },
      ],
    },
    // {
    //   path: "movies",
    //   element: <MoviePage />,
    //   children: [
    //     {
    //       path: "create-movie",
    //       element: <CreateMoviePage />,
    //     },
    //   ],
    // },
    // { path: "series", element: <SeriesPage /> },
  ]);

  return element;
}

export default App;
