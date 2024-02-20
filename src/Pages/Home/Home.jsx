import React, { useState, useEffect, useRef } from 'react';
import './home.css';
import axios from 'axios';
import ModaleCreateBook from '../../Components/ModalCreateBook/ModalCreateBook';
import CardBook from '../../Components/CardBook/CardBook';
import logo from "../../Img/logoLC.png"
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
      const response = await axios.get('https://biblioteca-la-carlota.onrender.com/book');
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
      const normalizedTitulo = book.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return normalizedTitulo.includes(normalizedSearchTerm);
    })
    .sort((a, b) => a.titulo.localeCompare(b.titulo));
  
   const handleBookDeleted = (deletedBookId) => {
    setBooks(prevBooks => prevBooks.filter(book => book._id !== deletedBookId));
  };

  return (
    <div className='home'>
      <div className="headerHome">
        <img src={logo} alt="" />
        <h1>BIBLIOTECA MUNICIPAL DE LA CARLOTA</h1>
        {isLoggedIn && <button onClick={openSettings} className='linkadm2'>Agregar libro</button>}
        {open && <ModaleCreateBook key={isClosed} onClose={() => { closeModal2(); fetchBooks(); }} />} {/* Actualizar libros después de cerrar el modal */}
        {isLoggedIn && <button onClick={handleLogout} className='linkadm2'>Cerrar Sesión</button>}
        {!isLoggedIn && <a href="/login" className='linkadm'>Admin</a>}
      </div>
      <div className="contlibros">
        <div className="contInp" style={{display:"flex", justifyContent:"space-between", width:"95%"}}>
          <h2>Libros en existencia</h2>
          <input
            type="text"
            ref={text}
            className='inputSearch'
            placeholder="Buscá tu libro..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredAndSortedBooks.length === 0 ? (
          <p>No se encontraron libros con ese nombre.</p>
        ) : (
          filteredAndSortedBooks.map((book) => (
            <CardBook
              key={book._id}
              id={book._id}
              title={book.titulo}
              category={book.categoria}
              description={book.descripcion}
              isLoggedIn={isLoggedIn}
              onBookDeleted={handleBookDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
}