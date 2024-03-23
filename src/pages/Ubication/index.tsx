import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../../ui/MyButton";
import css from "./index.css";
import { HayUserLocationAtom, LoggedAtom, UserLocationAtom, userDataAtom } from "../../atoms"

const url = "https://lostpets.onrender.com";

function UbicationPage() {

  const navigate = useNavigate();

  const [userLocation, setUserLocation] = useRecoilState(UserLocationAtom)
  const [hayLocation, setHayLocation] = useRecoilState(HayUserLocationAtom)
  const [userData, setUserData] = useRecoilState(userDataAtom)
  const [logged, setLogged] = useRecoilState(LoggedAtom)

  const userToken = localStorage.getItem("token");

  if (userData.fullname == "" && userToken) {

    console.log("hay token")
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
      setUserLocation(ubication)
      navigate("/pets", { replace: true });
    })
  }

  return (
    <div className={css.root}>
      <p className="">Encontrá y reportá mascotas cerca de tu ubicación</p>
      <div onClick={aceptar}>
        <MainButton>Dar mi ubicación</MainButton>
      </div>
    </div>
  );
}

export { UbicationPage };

// El boton dispara evento: obtengo locación, la mando al state y navego a pag siguiente