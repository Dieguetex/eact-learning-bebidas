import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 450,
    overflow: "scroll",
    border: "none",
    "max-height": "90vh",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Receta = ({ receta }) => {
  // Configuración del modal de material-ui
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const clases = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Extraer los valores del context
  const { recetaInfo, guardarIdReceta, guardarReceta } = useContext(
    ModalContext
  );

  // Muestra y formatea los ingredientes
  const mostrarIngredientes = (recetaInfo) => {
    let ingredientes = [];

    for (let i = 0; i < 16; i++) {
      if (recetaInfo[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            {recetaInfo[`strIngredient${i}`]} {recetaInfo[`strMeasure${i}`]}
          </li>
        );
      }
    }

    return ingredientes;
  };

  return (
    <div className="col-md-6 col-lg-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>

        <img
          className="card-img-top"
          src={receta.strDrinkThumb}
          alt={`Imagen de ${receta.strDrink}`}
        />

        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              guardarIdReceta(receta.idDrink);
              handleOpen();
            }}
          >
            Ver Receta
          </button>

          <Modal
            open={open}
            onClose={() => {
              // Limpiar el state y cerrar el modal
              guardarIdReceta(null);
              guardarReceta({});
              handleClose();
            }}
          >
            <div style={modalStyle} className={clases.paper}>
              <h2>{recetaInfo.strDrink}</h2>
              <h3 className="mt-4">Instrucciones</h3>
              <p>{recetaInfo.strInstructions}</p>
              <div className="modal-container"></div>
              <img className="img-fluid my-4" src={recetaInfo.strDrinkThumb} />
              <h3>Ingredientes y Cantidades</h3>
              <ul>{mostrarIngredientes(recetaInfo)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;
