import { useEffect } from "react";
import { atom, selector, useRecoilValue } from "recoil";
const url = "https://lostpets.onrender.com";



// --------------------- CODIGO NUEVO



export const UserLocationAtom = atom({
  key: "UserLocationAtom",
  default: { lat: 0, lng: 0 },
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

// ESTÁ LOGGED?

export const Logged = atom({
  key: "Logged",
  default: true
});
