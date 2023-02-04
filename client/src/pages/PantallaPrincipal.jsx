import "./PantallaPrincipal.css"
import {React, useState} from "react"
import ReactPlayer from 'react-player'

const PantallaPrincipal = () => {
     
    const [peli, setPeli] = useState([]) // Arreglo para guardar las películas.

    const pelicula = async (nombrePelicula) => { // Método para solicitar la película.
        
        // Solicitando la película.
        try{
            // Haciendo la petición.
            const response = await fetch(`http://localhost:5000/movies`, {
                method: "GET",
                params: {
                    nombre: nombrePelicula
                }
            })
            // Convirtiendo la respuesta a JSON.
            const data = await response.json()
            setPeli(data)
            console.log(data)
        }catch(error){
            console.log(error)
        }
    }
    
    return (
            <div className="Todo">
                
                <h1 className="titulo">Bienvenido a la pantalla principal del sistema de streaming</h1>
                
                {/* Input para ingresar el nombre de las películas */}
                <input type="text" placeholder="Nombre de la película" className="txtNombrePelicula"/>
                
                {/* Botón para solicitar la película */}
                <button className="btnSolicitarPelicula"

                    onClick={() => {
                        const nombrePelicula = document.querySelector(".txtNombrePelicula").value
                        //console.log(nombrePelicula)
                        pelicula(nombrePelicula)
                    }}
                
                    >Solicitar Película</button>

                {/* Verificando que peli no esté vacío */}
                {peli.length !== 0 ? (
                    
                    <div>
                        {/* Recorriendo e imprimiendo la lista de películas */}
                        
                        {
                            peli.map((pelicula) => {
                                return(
                                    <div className="Pelicula">
                                        <h1 className="NombrePelicula">{pelicula.nombre}</h1>
        
                                        <ReactPlayer url={pelicula.url} controls={true} />
                                    </div>
                                )
                            })
                        }

                    </div>

                ) : (
                    <>
                        <h1 className="Nada">No se encontró nada</h1>
                    </> 
                )}
            </div>
        )
    }
    

export default PantallaPrincipal