import React, { useState } from "react";
import css from "./index.css";
import { CustomMenu } from "../CustomMenu";
import { useNavigate } from "react-router-dom";


export function CustomHeader() {

  const navigate = useNavigate()

  function irInicio() { navigate("/", { replace: true }) }

  return (
    <div className={css.root}>
      <div onClick={irInicio} className={css.logo}>LOGO</div>
      <div className="items">
        <CustomMenu />
      </div>
    </div>
  );
}
