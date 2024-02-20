import React, { useState } from "react";
import './modalecreatebook.css';
import axios from 'axios';
import { LoadStart, LoadRemove } from '../../Components/Loading.jsx'

export default function ModaleCreateBook({ onClose }){
    const [formData, setFormData] = useState({
        estado: '',
        vehiculo: '',
        cliente: '',
        fecha: '',
        pago: '',
        total: '',
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
        axios.post('http://localhost:8080/book/create', formData)
            .then(response => {
                console.log('Cliente creado:', response.data);
                LoadRemove()
                onClose();
            })
            .catch(error => {
                LoadRemove()
                console.error('Error al crear el cliente:', error);
            });
    };

    return(
        <section id="modalcreatebook">
            <div className="contForm" style={{borderRadius:"10px"}}>
            <div className="mb-3">
                <label htmlFor="estado" className="form-label">Estado</label>
                <select 
                    className={`form-select ${formData.estado}`} 
                    id="estado" 
                    name="estado" 
                    value={formData.estado} 
                    onChange={handleInputChange}
                >
                    <option value="">Seleccioná un estado</option>
                    <option value="ingresado">INGRESADO</option>
                    <option value="entregado">ENTREGADO</option>
                </select>
            </div>
                <div className="mb-3">
                    <label htmlFor="vehiculo" className="form-label">Marca</label>
                    <input type="text" className="form-control" id="vehiculo" name="vehiculo" value={formData.vehiculo} onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cliente" className="form-label">Cliente</label>
                    <input className="form-control" id="cliente" name="cliente" value={formData.cliente} onChange={handleInputChange} rows="3"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha</label>
                    <input type="date" className="form-control" id="fecha" name="fecha" value={formData.fecha} onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pago" className="form-label">Pago</label>
                    <select 
                    className={`form-select ${formData.pago}`} 
                    id="pago" 
                    name="pago" 
                    value={formData.pago} 
                    onChange={handleInputChange}
                >
                    <option value="">Seleccioná un estado</option>
                    <option value="pendiente">PENDIENTE</option>
                    <option value="realizado">REALIZADO</option>
                </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="total" className="form-label">Total</label>
                    <input className="form-control" id="total" name="total" value={formData.total} onChange={handleInputChange} rows="3"/>
                </div>
                <div className="contBtn">
                    <button onClick={onClose} className="linkadm">Cancelar</button>
                    <button onClick={handleAddBook} className="linkadm">Agregar</button>
                </div>
            </div>
        </section>
    )
}