import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import ListScreen from "../features/list";
import DetailScreen from "../features/detail";
import MyPokemon from "../features/mypokemon";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ListScreen /> },
      { path: "detail/:name", element: <DetailScreen /> },
      { path: "mypokemon", element: <MyPokemon /> },
    ],
  },
]);
