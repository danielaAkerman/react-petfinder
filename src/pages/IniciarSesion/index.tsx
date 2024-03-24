import React from "react";
import { useRecoilState } from "recoil";
import css from "./index.css";
import { useNavigate } from "react-router-dom";
import { HayUserLocationAtom, LoggedAtom, UserLocationAtom, userDataAtom } from "../../atoms";
import { MyInput } from "../../ui/MyInput";
import { LargeButton, MainButton } from "../../ui/MyButton";
import { CustomLink } from "../../ui/CustomLink";

const url = "https://lostpets.onrender.com";

export function IniciarSesion() {
  const navigate = useNavigate()
  const [logged, setLogged] = useRecoilState(LoggedAtom)
  const [userDataState, setUserDataState] = useRecoilState(userDataAtom);
  const [hayLocation, setHayLocation] = useRecoilState(HayUserLocationAtom)
  const [ubication, setUbication] = useRecoilState(UserLocationAtom)

  function submitIniciarSesion(e) {
    e.preventDefault()

    const loginValues: any = {};

    loginValues.email = e.target.email.value;
    loginValues.password = e.target.password.value;

    fetch(url + "/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(loginValues),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          console.log("ERROR", data);
          const advertencia = document.querySelector(".advertencia")
          advertencia.innerHTML = "Los datos no coinciden"
        } else if (data) {


          const userData: any = {};
          userData.userId = data.user.id;
          userData.fullname = data.user.fullname;
          userData.token = data.token;
          userData.email = loginValues.email;

          localStorage.setItem("token", data.token.toString());

          setUserDataState(userData);
          setLogged(true)

          {
            hayLocation

              ?
              navigate("/pets", { replace: true })
              :
              navigate("/", { replace: true })

          }
        }
      });
  }

  function irACrearCuenta() {
    navigate("/crear-cuenta", { replace: true })
  }

  return (
    <div className={css.root}>
      <h1>Iniciá Sesión</h1>
      <form onSubmit={submitIniciarSesion}>

        <MyInput name="email" label="Email:" />
        <MyInput name="password" label="Contraseña:" />

        <LargeButton type="submit">Ingresar</LargeButton>

        <span className="advertencia"></span>
      </form>
      <CustomLink label="¿Aún no tenés cuenta? " funcion={irACrearCuenta}>Registrate</CustomLink>

      {/* <span>¿Aún no tenés cuenta?<span onClick={irACrearCuenta}> Registrate</span></span> */}
    </div>
  );
}

