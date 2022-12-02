import "./PantallaPrincipal.css"
import {React, useState} from "react"


const PantallaPrincipal = () => {
     
    const [peli, setPeli] = useState([]) // Arreglo para guardar las películas.

    const pelicula = async (nombrePelicula) => {
        try{
            const response = await fetch('http://localhost:5000/peliculas')
            const data = await response.json()

            setPeli(data)
            console.log(data)
        }catch(error){
            console.log(error)
        }

        // Verificando que la película esté en el arreglo.
        for (let i = 0; i < peli.length; i++) {
            if (peli[i].nombre === nombrePelicula) {
                console.log("Película encontrada")
            } else {
                alert("Película no encontrada")
            }
        }
    }
    
    return (
            <div>
                <h1 className="titulo">Bienvenido a la pantalla principal del sistema de streaming</h1>
                {/* Input para ingresar el nombre de las películas */}
                <input type="text" placeholder="Nombre de la película" className="txtNombrePelicula"/>
                {/* Botón para solicitar la película */}
                <button className="btnSolicitarPelicula"

                    onClick={() => {
                        const nombrePelicula = document.querySelector(".txtNombrePelicula").value
                        console.log(nombrePelicula)
                        pelicula(nombrePelicula)
                    }}
                
                    >Solicitar Película</button>
            </div>
        )
    }

export default PantallaPrincipal