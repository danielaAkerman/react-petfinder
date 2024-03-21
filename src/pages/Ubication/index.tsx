import React from "react";
// import { ubicationState } from "../../atoms";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../../ui/MyButton";
import css from "./index.css";
import { HayUserLocationAtom, LoggedAtom, userDataAtom } from "../../atoms"
// import { init } from "../../api";

// const search = require("../../assets/img/search.jpeg");

const url = "https://lostpets.onrender.com";

function UbicationPage() {

  const navigate = useNavigate();

  const [hayLocation, setHayLocation] = useRecoilState(HayUserLocationAtom)
  const [userData, setUserData] = useRecoilState(userDataAtom)
  const [logged, setLogged] = useRecoilState(LoggedAtom)

  // VER SI HAY TOKEN PARA LOGUEAR

  const userToken = localStorage.getItem("token");

  if (userData.fullname == "" && userToken) {

    // init()
    fetch(url + "/init/" + userToken, {})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { id, email, fullname } = data;

        const userData: any = {};

        userData.userId = id;
        userData.email = email;
        userData.fullname = fullname;
        userData.token = userToken;
        setUserData(userData);
        setLogged(true)
      });
  }


  function aceptar() {
    navigator.geolocation.getCurrentPosition((e) => {
      const ubication = {
        lat: e.coords.latitude as any,
        lng: e.coords.longitude as any,
      };

      setHayLocation(true)
      navigate("/pets/" + ubication.lat + "&" + ubication.lng, { replace: true });
    })
  }

  return (
    <div className={css.root}>
      <div className="img-container">
        {/* <img src={search} className="img-fluid" /> */}
      </div>
      <p className="">Encontrá y reportá mascotas cerca de tu ubicación</p>
      <div onClick={aceptar}>
        <MainButton>Dar mi ubicación</MainButton>
      </div>

    </div>
  );
}

export { UbicationPage };

// El boton dispara evento: obtengo locación, la mando al state y navego a pag siguiente