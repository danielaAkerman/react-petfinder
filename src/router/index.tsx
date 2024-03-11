import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";
import { UbicationPage } from "../pages/Ubication";
import { LostPetsNearMe } from "../pages/LostPetsNearMe";
import { CrearCuenta } from "../pages/CrearCuenta";
import { EditarPublicacion } from "../pages/EditarPublicacion";
import { IniciarSesion } from "../pages/IniciarSesion";
import { MisMascotasReportadas } from "../pages/MisMascotasReportadas";
import { PublicarMascota } from "../pages/PublicarMascota";
import { MisDatos } from "../pages/MisDatos";
import { NotFoundPage } from "../pages/NotFoundPage";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UbicationPage />} />
        <Route path="ubication" element={<UbicationPage />} />
        <Route path="pets/:ubication" element={<LostPetsNearMe />} />
        <Route path="crear-cuenta" element={<CrearCuenta />} />
        <Route path="editar-publicacion" element={<EditarPublicacion />} />
        <Route path="iniciar-sesion" element={<IniciarSesion />} />
        <Route path="mis-mascotas-reportadas" element={<MisMascotasReportadas />} />
        <Route path="publicar-mascota" element={<PublicarMascota />} />
        <Route path="mis-datos" element={<MisDatos />} />
      <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export { AppRoutes };
