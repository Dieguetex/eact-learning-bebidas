import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

// Crear el context
export const CategoriasContext = createContext();

// Crear el provider, que es la referencia al context. Donde se encuentran las funciones y el state
const CategoriasProvider = (props) => {
  // State del context
  const [categorias, guardarCategorias] = useState([]);

  // Llamado a la API
  useEffect(() => {
    const obtenerCategorias = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;

      const response = await Axios.get(url);

      guardarCategorias(response.data.drinks);
    };
    obtenerCategorias();
  }, []);

  return (
    <CategoriasContext.Provider value={{ categorias }}>
      {props.children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;
