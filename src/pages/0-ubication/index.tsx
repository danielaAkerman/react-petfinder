import React from "react";
// import { ubicationState } from "../../atoms";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../../ui/MyButton";
import css from "./index.css";
// import { init } from "../../api";

// const search = require("../../assets/img/search.jpeg");

const url = "https://lostpets.onrender.com";

function UbicationPage() {
  // const [userDataState, setUserDataState] = useRecoilState(userDataAtom); // REEMPLAZAR POR CUSTOM HOOK
  const navigate = useNavigate();
  function aceptar() {


    // ACA OBTENER LAT Y LNG, Y AÑADIRLOS A LA URL

    navigator.geolocation.getCurrentPosition((e) => {
      const ubication = {
        lat: e.coords.latitude as any,
        lng: e.coords.longitude as any,
      };

      navigate("/pets/" + ubication.lat + "&" + ubication.lng, { replace: true });
    })
  }

  return (
    <div className={css.root}>
      <div className="img-container">
        {/* <img src={search} className="img-fluid" /> */}
      </div>
      <p className="">Para continuar, necesitamos conocer tu ubicación</p>
      <div onClick={aceptar}>
        <MainButton>Aceptar</MainButton>
      </div>

    </div>
  );
}

export { UbicationPage };

// El boton dispara evento: obtengo locación, la mando al state y navego a pag siguiente