import "./Components.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "rsuite";
import axios from 'axios';
import EditForm from "./EditForm";
import logo from "../assets/small-logo.png";
import defaultUser from "../assets/default-user.png";

const NavBar = (props) => {
  const [userName, setUserName] = useState("Usuario activo");
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgDefault, setImgDefault] = useState(defaultUser);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) setUserName(user);
  }, []);

  const getUserInfo = async () => {
    setLoading(true);
    const restUser = await axios.get('http://localhost:5000/logged-user', {
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    setUserInfo(restUser.data);
    if(restUser.data.imagen) {
      const imageName = await axios.get('http://localhost:5000/files/' + restUser.data.imagen, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      setImgDefault("http://localhost:5000/image/" + imageName.data.filename);
    }
    setLoading(false);
  }

  const dismissModal = () => {
    document.getElementById('dismiss').click();
  }

  return (
    <React.Fragment>
      {loading ? <Loader size="lg" backdrop content="Cargando..." /> : null}
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <img src={logo} alt="logo" className="small-logo-img" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Inicio
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/about">
                  Charts
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Charts
                </Link>
              </li>
              <li className="nav-item dropdown">
                <p
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userName}
                </p>
                <ul className="dropdown-menu">
                  <li>
                    <p
                      className="dropdown-item pointer-underline"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => getUserInfo()}
                    >
                      Perfil
                    </p>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Cerrar sesión
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Perfil usuario
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="dismiss"
              ></button>
            </div>
            <EditForm userInfo={userInfo} setLoading={setLoading} dismissModal={dismissModal} imgDefault={imgDefault} setImgDefault={setImgDefault} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
