import React from "react";
import css from "./index.css";
import { HayUserLocationAtom, LoggedAtom, UserLocationAtom, userDataAtom, ShowBurgerMenuAtom } from "../../atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { CustomLink } from "../../ui/CustomLink";

export function CustomMenu() {

  const navigate = useNavigate()

  const [logged, setLogged] = useRecoilState(LoggedAtom)
  const [data, setData] = useRecoilState(userDataAtom)
  // const [ubication, setUbication] = useRecoilState(UserLocationAtom)
  const [hayUbication, setHayUbication] = useRecoilState(HayUserLocationAtom)
  const [showBurger, useShowBurger] = useRecoilState(ShowBurgerMenuAtom)


  function irMisDatos() { useShowBurger(false), navigate("/mis-datos", { replace: true }) }

  function irMisMascotasReportadas() { useShowBurger(false), navigate("/mis-mascotas-reportadas", { replace: true }) }

  function irReportarMascota() { useShowBurger(false), navigate("/publicar-mascota", { replace: true }) }

  function irCrearCuenta() { useShowBurger(false), navigate("/crear-cuenta", { replace: true }) }

  function irIniciarSesion() { useShowBurger(false), navigate("/iniciar-sesion", { replace: true }) }

  function irCerrarSesion() {
    setLogged(false)
    useShowBurger(false)
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
          <CustomLink funcion={irMisDatos}>Mis datos</CustomLink>
          <CustomLink funcion={irMisMascotasReportadas}>Mis mascotas reportadas</CustomLink>
          <CustomLink funcion={irReportarMascota}>Reportar mascota</CustomLink>
          <CustomLink funcion={irCerrarSesion}>Cerrar sesión</CustomLink>
        </div>

        :

        <div className={css.root}>
          <CustomLink funcion={irCrearCuenta}>Crear cuenta</CustomLink>
          <CustomLink funcion={irIniciarSesion}>Iniciar sesión</CustomLink>
        </div>

      }

    </div>
  );
}