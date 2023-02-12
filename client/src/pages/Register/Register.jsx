import "./Register.css"
import { React, useState } from 'react'
import {
    useNavigate
  } from "react-router-dom"
import '../Home/Home'  

// Método para enviar los datos del usuario a la base de datos.
const enviarDatos = async (usuario, contrasena) => {
    console.log(usuario, contrasena)

    try {
        const response = await fetch(`http://localhost:5000/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: usuario,
                password: contrasena
            })
        })
        // Enviamos los datos al servidor.
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

// Objetos con los que el usuario interactúa.
const Registro = () => {

    const navigate1 = useNavigate() // Hook para regresar a Home.

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
                    enviarDatos(usuario, contrasena)
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