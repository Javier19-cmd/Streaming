import { Link } from "react-router-dom"
import { React, useState } from 'react'
import "./Home.css"
import {
  useNavigate
} from "react-router-dom"

const Home = () => {

  const navigate1 = useNavigate() // Hook para navegar entre páginas.

  const [datos, setDatos] = useState([])

  // Método para verificar si el usuario existe en la base de datos.
  const verificarUsuario = async (usuario, contrasena) => {
    
    // console.log(usuario, contrasena)
    try {
      const response = await fetch(`http://localhost:5000/usuarioss/${usuario}`)
      const data = await response.json()
      setDatos(data)
      //console.log(data)
    } catch (error) {
      console.log(error)
    }
    
    console.log(datos[0].usuario)
  

    if (datos[0].usuario === usuario && datos[0].contrasena.split("").reverse().join("") === contrasena) {
      console.log("Usuario correcto")
      navigate1("/pantalla_principal")
    } else {
      alert("Ha ocurrido un error")
    }
  }

  const navigate = useNavigate() // Hook para navegar entre páginas.
  
  return (
    <div>
      <h1 className="titulo">Bienvenido a la pantalla de inicio del sistema de streaming</h1>
      <h3 className="InicioSesion">Iniciar Sesión</h3>
      <input type="text" placeholder="Usuario" className="txtUsuario"/>
      <input type="password" placeholder="Contrasena" className="txtContraseña"/>
      {/* Botón que verifica que el usuario y la contraseña estén buenos */}
      <button className="btnIniciarSesion" onClick={() => {
          const usuario = document.querySelector(".txtUsuario").value
          const contrasena = document.querySelector(".txtContraseña").value
          // console.log(usuario)
          // console.log(contrasena)
          // Enviando los datos al método para verificar si el usuario existe.
          verificarUsuario(usuario, contrasena)
      }}>Iniciar Sesión</button>
      <Link to="about" className="about">About</Link>
      <Link to="contact" className="contact">Contacto</Link>
      <h3 className="Registro">Regístrarse</h3>
      <button className="btnRegistro" onClick={() => navigate("registro")}>Registrarse</button>
    </div>
  )
}

export default Home