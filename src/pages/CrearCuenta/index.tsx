import React from "react";
import { useRecoilState } from "recoil";
import css from "./index.css";
import { useNavigate } from "react-router-dom";
import { userDataAtom, LoggedAtom, HayUserLocationAtom, UserLocationAtom } from "../../atoms"
import { MyInput } from "../../ui/MyInput";
import { LargeButton } from "../../ui/MyButton";
import { CustomLink } from "../../ui/CustomLink";


const url = "https://lostpets.onrender.com";



export function CrearCuenta() {
  const navigate = useNavigate()

  const [userData, setUserData] = useRecoilState(userDataAtom)
  const [logged, setLogged] = useRecoilState(LoggedAtom)
  const [hayUbicacion, setHayUbicacion] = useRecoilState(HayUserLocationAtom)
  const [ubicacion, setUbicacion] = useRecoilState(UserLocationAtom)

  function submitCrearCuenta(e) {
    e.preventDefault()

    const nombre = e.target.nombre.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;

    if (password == password2) {

      const signUpValues: any = {};

      signUpValues.fullname = nombre;
      signUpValues.email = email;
      signUpValues.password = password

      fetch(url + "/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signUpValues),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const userData: any = {};
          userData.email = email;
          userData.fullname = nombre;
          userData.token = data._userToken;
          userData.userId = data.user_id;

          setUserData(userData);
          setLogged(true)

          localStorage.setItem("token", userData.token.toString());

          if (hayUbicacion) {
            navigate("/pets", { replace: true });

          } else {
            navigate("/", { replace: true });
          }
        });
    } else {
      const advertencia = document.querySelector(".advertencia")
      advertencia.innerHTML = "Las contraseñas no coinciden"
    }
  }

  function irAIniciarSesion() {
    navigate("/iniciar-sesion", { replace: true })
  }

  return (
    <div className={css.root}>

      <h1>Registrate</h1>

      <form onSubmit={submitCrearCuenta} className={css.form}>
        <MyInput name="nombre" label="Nombre:" />
        <MyInput name="email" label="Email:" />
        <MyInput type="password" name="password" label="Contraseña:" />
        <MyInput type="password" name="password2" label="Repetir contraseña:" />

        <LargeButton>Ingresar</LargeButton>
        <span className="advertencia"></span>
      </form>
      <CustomLink label="¿Ya tenés cuenta? " funcion={irAIniciarSesion}>Iniciá sesión</CustomLink>

    </div>
  );
}

