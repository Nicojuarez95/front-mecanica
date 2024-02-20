import React, { useState, useEffect, useRef } from 'react';
import './home.css';
import axios from 'axios';
import ModaleCreateBook from '../../Components/ModalCreateBook/ModalCreateBook';
import CardBook from '../../Components/CardBook/CardBook';
import logo from "../../Img/logotaller-removebg-preview.png"
import { LoadStart, LoadRemove } from '../../Components/Loading.jsx'

export default function Home() {
  const [books, setBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const text = useRef("");

  useEffect(() => {
    fetchBooks(); // Llamar a la función para obtener libros al montar el componente
    // Verificar si hay un token almacenado en el localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [isClosed]);

  // Función para obtener la lista de libros
  const fetchBooks = async () => {
    LoadStart()
    try {
      const response = await axios.get('http://localhost:8080/book');
      LoadRemove()
      setBooks(response.data.books);
    } catch (error) {
      LoadRemove()
      console.error('Error fetching books:', error);
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const openSettings = () => {
    setOpen(true);
  };

  const closeModal2 = () => {
    setOpen(false);
    setIsClosed(true);
  };

  // Filtrar y ordenar los libros alfabéticamente por título
  const filteredAndSortedBooks = books
    .filter((book) => {
      const normalizedSearchTerm = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const normalizedTitulo = book.cliente.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return normalizedTitulo.includes(normalizedSearchTerm);
    })
    .sort((a, b) => a.cliente.localeCompare(b.cliente));
  
   const handleBookDeleted = (deletedBookId) => {
    setBooks(prevBooks => prevBooks.filter(book => book._id !== deletedBookId));
  };

  return (
    <div className='home'>
      <div className="headerHome">
        <img src={logo} alt="" />
        <h1>Taller Lunetti</h1>
        {isLoggedIn && <button onClick={openSettings} className='linkadm2'>Agregar Cliente</button>}
        {open && <ModaleCreateBook key={isClosed} onClose={() => { closeModal2(); fetchBooks(); }} />} {/* Actualizar libros después de cerrar el modal */}
        {isLoggedIn && <button onClick={handleLogout} className='linkadm2'>Cerrar Sesión</button>}
        {!isLoggedIn && <a href="/login" className='linkadm'>Admin</a>}
      </div>
      <div className="contlibros">
        <div className="contInp" style={{display:"flex", justifyContent:"space-between", width:"95%"}}>
          <h2>Clientes</h2>
          <input
            type="text"
            ref={text}
            className='inputSearch'
            placeholder="Buscá el cliente..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredAndSortedBooks.length === 0 ? (
          <p>No se encontraron clientes con ese nombre.</p>
        ) : (
          filteredAndSortedBooks.map((book) => (
            <CardBook
              key={book._id}
              id={book._id}
              estado={book.estado}
              vehiculo={book.vehiculo}
              cliente={book.cliente}
              fecha={book.fecha}
              pago={book.pago}
              total={book.total}
              isLoggedIn={isLoggedIn}
              onBookDeleted={handleBookDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
}