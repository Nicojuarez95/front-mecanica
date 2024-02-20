import React, { useState } from "react";
import './modalecreatebook.css';
import axios from 'axios';
import { LoadStart, LoadRemove } from '../../Components/Loading.jsx'

export default function ModaleCreateBook({ onClose }){
    const [formData, setFormData] = useState({
        titulo: '',
        categoria: '',
        descripcion: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddBook = () => {
        LoadStart()
        axios.post('https://biblioteca-la-carlota.onrender.com/book/create', formData)
            .then(response => {
                console.log('Libro creado:', response.data);
                LoadRemove()
                onClose();
            })
            .catch(error => {
                LoadRemove()
                console.error('Error al crear el libro:', error);
            });
    };

    return(
        <section id="modalcreatebook">
            <div className="contForm" style={{borderRadius:"10px"}}>
                <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">Nombre del libro</label>
                    <input type="text" className="form-control" id="titulo" name="titulo" value={formData.titulo} onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">Categoría</label>
                    <input type="text" className="form-control" id="categoria" name="categoria" value={formData.categoria} onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea className="form-control" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleInputChange} rows="3"></textarea>
                </div>
                <div className="contBtn">
                    <button onClick={onClose} className="linkadm">Cancelar</button>
                    <button onClick={handleAddBook} className="linkadm">Agregar</button>
                </div>
            </div>
        </section>
    )
}