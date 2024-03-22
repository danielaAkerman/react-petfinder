import { useEffect } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
const url = "https://lostpets.onrender.com";



// --------------------- CODIGO NUEVO



export const UserLocationAtom = atom({
  key: "UserLocationAtom",
  default: { lat: null, lng: null },
});

export const HayUserLocationAtom = atom({
  key: "HayUserLocationAtom",
  default: false,
});

export const traerPerrosSelector = selector({
  key: "traerPerrosSelector",
  get: async ({ get }) => {

    // Me suscribo al ATOM
    const { lat, lng } = get(UserLocationAtom)

    // Pido datos al BACK
    const res = await fetch(url + "/pets-near-me" + "?lat=" + lat + "&lng=" + lng);
    const results = await res.json();

    return results;
  },
});



// MOSTRAR MODAL LOSTPETEITEM

export const ShowModalLostPet = atom({
  key: "ShowModalLostPet",
  default: false,
});


// DATOS MODAL LOSTPETEITEM

export const DataModalLostPet = atom({
  key: "DataModalLostPet",
  default: {
    name: "", objectID: ""
  }
});


export const LoggedAtom = atom({
  key: "Logged",
  default: false
});

export const userDataAtom = atom({
  key: "userData",
  default: { email: "", fullname: "", token: "", userId: null }
});

export const cambioAtom = atom({
  // esto se activa despues de publicar o editar una mascota propia, asignándole números random
  key: "cambioAtom",
  default: 1
});

export const myReportedPetsSelector = selector({
  key: "myReportedPetsSelector",
  get: async ({ get }) => {
    const userId = get(userDataAtom).userId;
    const cambio = get(cambioAtom) // Para que traiga la info actualizada

    const res = await fetch(url + "/my-pets/" + userId);
    const results = await res.json();
    return results;
    // return [];
  },
});

export const datosMyPet = atom({
  key: "datosMyPet",
  default: {
    objectID: null,
    name: "",
    ubication: "",
    picture_url: ""
  }
});