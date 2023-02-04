import "./Registro.css"
import { React, useState } from 'react'
import {
    useNavigate
  } from "react-router-dom"
import './Home'  

const hmac = (contrasena) => {
    // Darle la vuelta a la contraseña.
    let contrasenaInvertida = contrasena.split("").reverse().join("")
    // console.log(contrasenaInvertida)
    return contrasenaInvertida
}

// Método para enviar los datos del usuario a la base de datos.
const enviarDatos = async (usuario, contrasena) => {
    console.log(usuario, contrasena)

    try {
        const response = await fetch(`http://localhost:5000/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                correo: usuario,
                contrasena: contrasena
            })
        })
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

// Objetos con los que el usuario interactúa.
const Registro = () => {

    const navigate1 = useNavigate() // Hook para regresar a Home.

    const [datos, setDatos] = useState([])

      // Método para verificar si el usuario existe en la base de datos.
    const verificarUsuario = async (usuario, contrasena) => {
        
        //console.log(usuario, contrasena)
        
        // Obtener los datos de la base de datos.
        try {
            const response = await fetch(`http://localhost:5000/datos`)
            const data = await response.json()
            setDatos(data)
        //console.log(data)
        } catch (error) {
            console.log(error)
        }

        console.log(datos[0].correo)
        
        // Verificando si el usuario existe.
        if (datos[0].correo === usuario) {
            alert("El usuario ya existe")
        } else {
            enviarDatos(usuario, contrasena)
        }

    }

    return (
        <div>
            <h1 className="titulo">Bienvenido a la pantalla de registro del sistema de streaming</h1>
            {/* Formulario para registrar un nuevo usuario */}
            
            <label className="Cor">Correo</label>
            <input type="text" placeholder="Usuario" className="txtUsuarioo"/>
            <label className="Con">Contraseña</label>
            <input type="password" placeholder="Contrasena" className="txtContrasenaa"/>
            <button className="btnRegistrar" onClick={
                () => {
                    const usuario = document.querySelector(".txtUsuarioo").value
                    const contrasena = document.querySelector(".txtContrasenaa").value
                    verificarUsuario(usuario, contrasena)
                }
            }>Registrar</button>

            <button className="btnRegreso" onClick={
                () => {
                    navigate1("/") // Regresar a Home.
                }

            }> Regresar </button>

        </div>
    )
}

export default Registro