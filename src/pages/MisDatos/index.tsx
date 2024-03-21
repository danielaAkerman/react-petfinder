import React from "react";
import css from "./index.css";
import { LoggedAtom, userDataAtom } from "../../atoms";
import { useRecoilState } from "recoil";
const url = "https://lostpets.onrender.com";

export function MisDatos() {

  const [logged, setLogged] = useRecoilState(LoggedAtom)
  const [data, setData] = useRecoilState(userDataAtom)

  const { email, fullname, token, userId } = data

  console.log("Inicialmente los valores del user son:", {data});

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
          setData(dataValues);
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
        <label >
          <span>Nombre:</span>
          <input name="nombre" defaultValue={fullname} placeholder={fullname}></input>
        </label>

        <label >
          <span>Email:</span>
          <input name="email" defaultValue={email} placeholder={email}></input>
        </label>

        <label >
          <span>Cambiar contraseña:</span>
          <input name="password"></input>
        </label>

        <label >
          <span>Repetir contraseña:</span>
          <input name="password2"></input>
        </label>

        <button>Actualizar datos</button>
        <span className="advertencia"></span>

      </form>

    </div>
  );
}
