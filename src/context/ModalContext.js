import React, { createContext, useEffect, useState } from "react";
import Axios from "axios";

// Crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {
  // State del provider
  const [idReceta, guardarIdReceta] = useState(null);
  const [recetaInfo, guardarReceta] = useState({});

  // Cuando tenemos una receta, llamar API
  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idReceta) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

      const respuesta = await Axios.get(url);

      guardarReceta(respuesta.data.drinks[0]);
    };
    obtenerReceta();
  }, [idReceta]);

  return (
    <ModalContext.Provider
      value={{ recetaInfo, guardarIdReceta, guardarReceta }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
