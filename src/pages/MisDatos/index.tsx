import React from "react";
import css from "./index.css";
import { LoggedAtom, userDataAtom } from "../../atoms";
import { useRecoilState } from "recoil";
import { MyInput } from "../../ui/MyInput";
import { LargeButton, MainButton } from "../../ui/MyButton";
const url = "https://lostpets.onrender.com";

export function MisDatos() {

  const [logged, setLogged] = useRecoilState(LoggedAtom)
  const [userData, setUserData] = useRecoilState(userDataAtom)
  const { email, fullname, token, userId } = userData

  const userToken = localStorage.getItem("token");

  if (userData.fullname == "" && userToken) {

    console.log("hay token, se inicia sesión")
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

  function updateDatos(e){
    e.preventDefault();

    const nombreInputValue = e.target.nombre.value;
    const emailInputValue = e.target.email.value;
    const passwordInputValue = e.target.password.value || "";
    const password2InputValue = e.target.password2.value || "";

    if (passwordInputValue == password2InputValue) {
      const dataValues: any = {};

      dataValues.fullname = nombreInputValue || fullname;
      dataValues.email = emailInputValue || email;
      dataValues.token = token;
      dataValues.password = passwordInputValue;

      fetch(url + "/update-user/" + userId, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(dataValues),
      })
        .then((res) => {
          return res.json();
        })
        .then(() => {
          setUserData(dataValues);
        });
    } else {
      const advertencia = document.querySelector(".advertencia")
      advertencia.innerHTML = "Las contraseñas no coinciden"
    }
  }

  return (

    <div className={css.root}>

      <h1>Mis Datos</h1>

      <form onSubmit={updateDatos} className={css.form}>

        <MyInput name="nombre" label="Nombre:" defaultValue={fullname} placeholder={fullname} />
        <MyInput name="email" label="Email:" defaultValue={email} placeholder={email} />
        <MyInput name="password" label="Cambiar contraseña:" />
        <MyInput name="password2" label="Repetir contraseña:" />

        <LargeButton>Actualizar datos</LargeButton>
        <span className="advertencia"></span>

      </form>

    </div>
  );
}
