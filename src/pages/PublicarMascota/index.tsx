import React from "react";
import { useRecoilState } from "recoil";
import css from "./index.css";
import { useNavigate } from "react-router-dom";
import { HayUserLocationAtom, LoggedAtom, userDataAtom, UserLocationAtom, cambioAtom } from "../../atoms";
import { MyInput } from "../../ui/MyInput";
import { LargeButton, MainButton } from "../../ui/MyButton";
const url = "https://lostpets.onrender.com";

export function PublicarMascota() {

  const navigate = useNavigate();
  const [logged, setLogged] = useRecoilState(LoggedAtom)
  const [cambio, setcambio] = useRecoilState(cambioAtom)
  const [userData, setUserData] = useRecoilState(userDataAtom)

  const { userId } = userData


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



  const datosNewPet: any = {};

  const convertiraBase64 = (archivos) => {
    Array.from(archivos).forEach((archivo: any) => {
      var reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = function () {
        var base64 = reader.result;
        datosNewPet.imagen_data = base64;
      };
    });
  };
  function submittedPet(e) {
    e.preventDefault();
    navigate("/mis-mascotas-reportadas", { replace: true })

    datosNewPet.userId = userId;
    datosNewPet.name = (e.target.name.value).toUpperCase();
    datosNewPet.ubication = (e.target.ubication.value).toUpperCase();
    datosNewPet.status = "lost";

    const MAPKEY = "pk.58d33aa8a8d98aab3cf1c2140e1014e3"
    const PLACE =
      ((datosNewPet.ubication)
        .replace(',', '%2C'))
        .replace(' ', '%20')
        .replace('Á', '%C3%81')
        .replace('É', '%C3%89')
        .replace('Í', '%C3%8D')
        .replace('Ó', '%C3%93')
        .replace('Ú', '%C3%9A')

    fetch(

      `https://us1.locationiq.com/v1/search?key=${MAPKEY}&q=${PLACE}%2C%20argentina&format=json`
      // %2C = ,
      // %20 = spc
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const lat = +(data[0].lat)
        const lon = +(data[0].lon)

        datosNewPet.last_location_lat = lat;
        datosNewPet.last_location_lng = lon;

        fetch(url + "/new-pet", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(datosNewPet),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setcambio(Math.random())
            // navigate("/mis-mascotas-reportadas", { replace: true })
          });
      })
  }

  return (
    <div className={css.root}>
      <h1>Publicar Mascota</h1>

      <form onSubmit={submittedPet} className={css.form}>

        <MyInput name="name" label="Nombre de tu mascota:" />

        <div className={css["dropzone"]}>
          <span>Adjuntar imagen:</span>
          <input
            type="file"
            multiple
            onChange={(e) => convertiraBase64(e.target.files)}
            className={css.input_img}
          />
        </div>

        <MyInput name="ubication" label="Ciudad:" />

        <div className={css.map}>
          <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1MITVPExrphDfLkJqao9bzZtL7BO7Fv4&ehbc=2E312F" width="100%" height="344"></iframe>
        </div>

        <LargeButton type="submit">Publicar</LargeButton>
      </form>
    </div>
  );
}

