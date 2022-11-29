import { Link } from "react-router-dom"
import "./Home.css" 
import imagen1 from "./Assets/Caballo.png"
import Btn from "./btnUsuario"

const Home = () => {
  return (
    <div className="home">
      <h1 className="titulo">Bienvenido a la pantalla de inicio del sistema de streaming</h1>
      <input type="text" placeholder="Usuario" className="txtUsuario"/>
      <input type="password" placeholder="Contraseña" className="txtContraseña"/>
      <Link to="about" className="about">About</Link>
      <Link to="contact" className="contact">Contacto</Link>
      <Btn/>
    </div>
  )
}

export default Home