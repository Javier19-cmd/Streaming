import { Link } from "react-router-dom"
import { React, useState, useEffect } from 'react'
import "./Home.css"
import {
  useNavigate
} from "react-router-dom"

const Home = () => {

  const [datos, setDatos] = useState([])
  
  // Método para probar el get.
  const getDatos = async () => {
    try {
      const response = await fetch("http://localhost:5000/usuarioss")
      const data = await response.json()
      setDatos(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  // Método para verificar si el usuario existe en la base de datos.
  const verificarUsuario = async (usuario, contrasena) => {
    
    // console.log(usuario, contrasena)
    try {
      const response = await fetch("http://localhost:5000/usuarioss")
      const data = await response.json()
      setDatos(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }

    // Recorremos el arreglo de datos para verificar si el usuario existe.
    for (let i = 0; i < datos.length; i++) {
      if (datos[i].usuario === usuario && datos[i].contrasena === contrasena) {
        console.log("Usuario encontrado")
        console.log(datos[i].usuario)
        console.log(datos[i].contrasena)
        return true
      }
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
          if (verificarUsuario(usuario, contrasena)) {
            console.log("Usuario encontrado")
          } else {
            console.log("Usuario no encontrado")
          }
      }}>Iniciar Sesión</button>
      <Link to="about" className="about">About</Link>
      <Link to="contact" className="contact">Contacto</Link>
      <h3 className="Registro">Regístrarse</h3>
      <button className="btnRegistro" onClick={() => navigate("registro")}>Registrarse</button>
    </div>
  )
}

export default Home