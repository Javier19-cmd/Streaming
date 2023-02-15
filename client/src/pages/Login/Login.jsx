import "./Login.css";
import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader } from "rsuite";
import axios from "axios";
import Swal from 'sweetalert2';
import logo from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate(); // Hook para navegar entre páginas.
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
    document.body.style.removeProperty('background-color');
    document.body.style.removeProperty('background-image');
  }, [])

  // Método para verificar si el usuario existe en la base de datos.
  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const usuario = document.getElementById("email").value;
      const contrasena = document.getElementById("password").value;
      axios
        .post("http://localhost:5000/login", {
          email: usuario,
          password: contrasena,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          navigate(`/pantalla_principal/${usuario}/${res.data.user.id}`);
        }).catch((err) => {
          console.log(err);
          Swal.fire('¡Atención!', err.response.data.msg, 'warning');
        }).finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? <Loader size="lg" backdrop content="Cargando..." /> : null}
      <div className="form-container">
        <img src={logo} alt="logo" className="logo-img" />
        <h1 className="main-h1">Inicio de sesión</h1>
        <form onSubmit={(e) => login(e)}>
          <input
            id="email"
            type="text"
            placeholder="Correo"
            className="input-text"
          />
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="input-password"
          />
          <button type="submit" className="btnIniciarSesion">
            {" "}
            Iniciar Sesión{" "}
          </button>
        </form>
        <div className="form-switch">
          ¿No tienes una cuenta? <Link to="/registro">Registrarse</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
