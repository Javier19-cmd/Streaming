import { Link } from "react-router-dom"
import "./Home.css" 
import imagen1 from "./Assets/Caballo.png"
import Btn from "./btnUsuario"

function Home() {
  return (
    <div className="home">
      <h1 className="titulo">Pantalla principal del blog</h1>
      <img src={imagen1} className="imgP"/>
      <Link to="about" className="about">About</Link>
      <Link to="contact" className="contact">Contacto</Link>
      <Btn/>
    </div>
  );
}

export default Home