import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoggedAtom, myReportedPetsSelector, userDataAtom } from "../../atoms";
import { MyLostPetItem } from "../../components/MyLostPetItem";
import css from "./index.css";
import { useNavigate } from "react-router-dom";
import { CustomLink } from "../../ui/CustomLink";

const url = "https://lostpets.onrender.com";

export function MisMascotasReportadas() {
  const navigate = useNavigate()


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

  const misMascotasReportadas = useRecoilValue(myReportedPetsSelector)
  function irAPublicarMascota() {
    navigate("/publicar-mascota", { replace: true })
  }

  return (

    <div>
      {misMascotasReportadas[0] ?

        <div>
          <h1>Mis Mascotas</h1>

          <div className={css.results} id="results">
            {misMascotasReportadas.map((m) => (
              <MyLostPetItem
                key={m.id}
                objectID={m.id}
                name={m.name}
                ubication={m.ubication}
                picture_url={m.picture_url}
                owner="me"
              />
            ))}
          </div>
        </div>
        :
        <div>
          <h1>No hay mascotas reportadas</h1>
          <CustomLink label="Para reportar una mascota perdida hacé " funcion={irAPublicarMascota}>click aquí</CustomLink>
        </div>
      }
    </div>
  );
}