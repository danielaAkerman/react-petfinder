import React, { useState } from "react";
import css from "./index.css";
import { CustomMenu } from "../CustomMenu";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserLocationAtom } from "../../atoms";


export function CustomHeader() {
  const [userLocation, useUserLocation] = useRecoilState(UserLocationAtom)
  const { lat, lng } = userLocation
  const navigate = useNavigate()

  function irInicio() {
    {
      userLocation.lat ?
        navigate("/pets", { replace: true })
        :
        navigate("/", { replace: true })

    }

  }
  return (
    <div className={css.root}>
      <div onClick={irInicio} className={css.logo}>LOGO</div>
      <div className="items">
        <CustomMenu />
      </div>
    </div>
  );
}
