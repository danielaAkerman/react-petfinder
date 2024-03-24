import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  selector,
  useSetRecoilState,
  RecoilState,
} from "recoil";
import { HayUserLocationAtom, UserLocationAtom, traerPerrosSelector } from "../atoms";


export function usePerrosCerca() {
  const [userLocation, setUserLocation] = useRecoilState(UserLocationAtom)
  const [hayUbicacion, setHayUbicacion] = useRecoilState(HayUserLocationAtom)
  const navigate = useNavigate()

  // Pedirle el resultado al Selector que está asociado al Atom que acabamos de modificar 
  const perros = useRecoilValue(traerPerrosSelector)
  return perros

}