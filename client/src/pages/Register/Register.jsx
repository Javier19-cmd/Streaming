import "./Register.css";
import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader } from "rsuite";
import Swal from 'sweetalert2';
import axios from 'axios'; 

// Objetos con los que el usuario interactúa.
const Registro = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para regresar a Home.

  useEffect(() => {
    document.body.style.removeProperty('background-color');
    document.body.style.removeProperty('background-image');
  }, [])

  // Método para enviar los datos del usuario a la base de datos.
  const register = async (e) => {
    e.preventDefault();
    const usuario = document.getElementById("email").value;
    const contrasena = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    if(contrasena !== confirmPassword) {
        Swal.fire('¡Atención!', 'Contraseñas no coinciden', 'warning');
        return;
    }
    setLoading(true);
    try {
      axios.post(`http://localhost:5000/register`, {
        email: usuario,
        password: contrasena,
      }).then((res) => {
        Swal.fire('¡Satisfactorio!', 'Usuario creado exitósamente.', 'success');
        navigate('/');
        return;
      }).catch((err) => console.log(err)).finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading ? <Loader size="lg" backdrop content="Cargando..." /> : null}
      <div className="form-container">
        <h1 className="main-h1">Registro</h1>
        <form onSubmit={(e) => register(e)}>
          <input id="email" type="text" placeholder="Correo" className="input-text" />
          <input id="password" type="password" placeholder="Contraseña" className="input-password" />
          <input id="confirm-password" type="password" placeholder="Confirmar contraseña" className="input-password" />
          <button type="submit" className="btnIniciarSesion">Registrarse</button>
        </form>
        <div className="form-switch">
          ¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
