import React from "react";
import css from "./index.css";
import { HayUserLocationAtom, LoggedAtom, UserLocationAtom, userDataAtom } from "../../atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export function CustomMenu() {

  const navigate = useNavigate()

  const [logged, setLogged] = useRecoilState(LoggedAtom)
  const [data, setData] = useRecoilState(userDataAtom)
  const [ubication, setUbication] = useRecoilState(UserLocationAtom)
  const [hayUbication, setHayUbication] = useRecoilState(HayUserLocationAtom)


  function irMisDatos() { navigate("/mis-datos", { replace: true }) }

  function irMisMascotasReportadas() { navigate("/mis-mascotas-reportadas", { replace: true }) }

  function irReportarMascota() { navigate("/publicar-mascota", { replace: true }) }

  function irCrearCuenta() { navigate("/crear-cuenta", { replace: true }) }

  function irIniciarSesion() { navigate("/iniciar-sesion", { replace: true }) }

  function irCerrarSesion() {
    setLogged(false)
    setData({ email: "", fullname: "", token: "", userId: "" })

    localStorage.removeItem("token");

    hayUbication ?
      navigate("/pets", { replace: true })
      :
      navigate("/", { replace: true })

  }


  return (
    <div>

      {logged ?

        <div className={css.root}>
          <span className={css["header-item-hello"]}>Hola {data.fullname}</span>
          <span onClick={irMisDatos} className={css["header-item"]}>Mis datos</span>
          <span onClick={irMisMascotasReportadas} className={css["header-item"]}>Mis mascotas reportadas</span>
          <span onClick={irReportarMascota} className={css["header-item"]}>Resportar mascota</span>
          <span onClick={irCerrarSesion} className={css["header-item"]}>Cerrar sesión</span>
        </div>

        :

        <div className={css.root}>
          <span onClick={irCrearCuenta} className={css["header-item"]}>Crear cuenta</span>
          <span onClick={irIniciarSesion} className={css["header-item"]}>Iniciar sesión</span>
        </div>

      }

    </div>
  );
}
