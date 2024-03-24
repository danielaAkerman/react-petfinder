import React, { useState } from "react";
import css from "./index.css";
import { CustomMenu } from "../CustomMenu";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ShowBurgerMenuAtom, UserLocationAtom } from "../../atoms";
import pet from "../../assets/img/perro2.png"
import burger from "../../assets/img/menu2.png"

export function CustomHeader() {
  const [userLocation, useUserLocation] = useRecoilState(UserLocationAtom)
  const [showBurger, useShowBurger] = useRecoilState(ShowBurgerMenuAtom)
  const { lat, lng } = userLocation
  const navigate = useNavigate()

  function irInicio() {
    useShowBurger(false)
    {
      userLocation.lat ?
        navigate("/pets", { replace: true })
        :
        navigate("/", { replace: true })
    }
  }

  function desplegarBurguer() {
    useShowBurger(!showBurger)
  }

  return (
    <div className={css.root}>
      <div onClick={irInicio} className={css.logo}>
        <img className={css.logopet} src={pet}></img>
      </div>
      <div className={css["items-large"]}>
        <CustomMenu />
      </div>
      <div className={css["items-short"]}>
        <img className={css.burger} src={burger} onClick={desplegarBurguer}></img>
        <div style={showBurger ? { display: "flex", position: "absolute" } : { display: "none" }}>
          <CustomMenu />
        </div>
      </div>
    </div>
  );
}
