import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";
import { UbicationPage } from "../pages/0-ubication";
import { PetsPage } from "../pages/1-welcome";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UbicationPage />} />
        <Route path="ubication" element={<UbicationPage />} />
        <Route path="pets/:ubication" element={<PetsPage />} />
      </Route>

    </Routes>
  );
}

export { AppRoutes };
