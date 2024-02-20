import React, { useState, useEffect } from "react";
import axios from 'axios';
import './cardbook.css';
import { LoadStart, LoadRemove } from '../../Components/Loading.jsx'

export default function CardBook({ id, estado, vehiculo, cliente, fecha, pago, total, onBookDeleted, isLoggedIn }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    LoadStart()
    axios.delete(`http://localhost:8080/book/delete/${id}`)
      .then(response => {
        console.log('Libro eliminado:', response.data);
        LoadRemove()
        setDeleted(true);
        setShowConfirmation(false);
      })
      .catch(error => {
        LoadRemove()
        console.error('Error al eliminar el libro:', error);
        setShowConfirmation(false);
      });
  };

  useEffect(() => {
    if (deleted) {
      // Actualiza la lista de libros después de la eliminación
      onBookDeleted(id);
    }
  }, [deleted, id, onBookDeleted]); // Se ejecuta cuando deleted cambia

  useEffect(() => {
    if (showConfirmation) {
      // Muestra la alerta de confirmación
      const confirm = window.confirm('¿Estás seguro de borrar este libro?');
      if (confirm) {
        confirmDelete();
      } else {
        setShowConfirmation(false);
      }
    }
  }, [showConfirmation]); // Se ejecuta cuando showConfirmation cambia

  return (
    <div className="card" style={{ width: "95%", height: "auto", zIndex:"0" }}>
      <div className="card-body" style={{padding:"0"}}>
      <div className="filtro">
        <div className="card-top-body" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background:"transparent" }}>
          <p className="card-text" style={{background:"transparent", fontWeight:"600", color:"white"}}>Estado:{estado}</p>
          <p className="card-text" style={{background:"transparent", fontWeight:"600",color:"white"}}>Cliente: {cliente}</p>
          <p className="card-text" style={{background:"transparent", fontWeight:"600", color:"white"}}>Vehiculo:{vehiculo}</p>
          <p className="card-text" style={{background:"transparent", fontWeight:"600", color:"white"}}>Fecha:{fecha}</p>
          <p className="card-text" style={{background:"transparent", fontWeight:"600", color:"white"}}>Pago:{pago}</p> 
          <p className="card-text" style={{background:"transparent", fontWeight:"600", color:"white"}}>Total: ${total}</p>
            {isLoggedIn && <button className="btnDelete" style={{ background:"red", color:"white", padding:"5px", fontSize:"10px", border:"1px", borderRadius:"5px", fontWeight:"900"}} onClick={handleDelete}>BORRAR</button>}
        </div>
        
      </div>
      </div>
    </div>
  );
}