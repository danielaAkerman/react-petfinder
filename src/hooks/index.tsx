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
  // Obtener los datos desde los params de URL
  const params = useParams()
  const stringCoords = params.ubication

  const lat = parseFloat(stringCoords.split("&")[0]);
  const lng = parseFloat(stringCoords.split("&")[1]);

  // Setear valor de URL en ATOM
  const setQueryValue = useSetRecoilState(UserLocationAtom)
  useEffect(() => { setQueryValue({ lat, lng }) }, [params])

  // Pedirle el resultado al Selector que está asociado al Atom que acabamos de modificar 
  const perros = useRecoilValue(traerPerrosSelector)
  return perros

}