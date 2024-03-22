import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  selector,
  useSetRecoilState,
  RecoilState,
} from "recoil";
import { UserLocationAtom, traerPerrosSelector } from "../atoms";


export function usePerrosCerca() {
  const [userLocation, setUserLocation] = useRecoilState(UserLocationAtom)

  // Pedirle el resultado al Selector que está asociado al Atom que acabamos de modificar 
  const perros = useRecoilValue(traerPerrosSelector)
  return perros

}