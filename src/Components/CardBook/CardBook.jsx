import React, { useState, useEffect } from "react";
import axios from 'axios';
import './cardbook.css';
import { LoadStart, LoadRemove } from '../../Components/Loading.jsx'

export default function CardBook({ id, title, category, description, onBookDeleted, isLoggedIn }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    LoadStart()
    axios.delete(`https://biblioteca-la-carlota.onrender.com/book/delete/${id}`)
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

  // Construye el enlace a partir del título del libro
  const linkToGoogleSearch = `https://www.google.com.ar/search?q=libro+${encodeURIComponent(title)}`;

  return (
    <div className="card" style={{ width: "95%", height: "auto", zIndex:"0" }}>
      <div className="card-body" style={{padding:"0"}}>
      <div className="filtro">
        <div className="card-top-body" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background:"transparent" }}>
          <h6 className="cate" style={{background:"transparent", color:"white"}}>{category}</h6>
          <h5 className="card-title" style={{background:"transparent", fontWeight:"700",color:"white"}}>{title}</h5>
          {isLoggedIn && <button className="btnDelete" style={{ background:"red", color:"white", padding:"5px", fontSize:"10px", border:"1px", borderRadius:"5px", fontWeight:"900"}} onClick={handleDelete}>BORRAR</button>}
        </div>
        <p className="card-text" style={{background:"transparent", fontWeight:"600", color:"white"}}>{description}</p>
        {/* Usar el enlace dinámico */}
        <a href={linkToGoogleSearch} className="card-link" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none", color:"white", background:"transparent"}}>Buscá este libro en Google</a>
      </div>
      </div>
    </div>
  );
}