import "./PantallaPrincipal.css"
import {React, useState} from "react"


const PantallaPrincipal = () => {
     
    const [peli, setPeli] = useState([]) // Arreglo para guardar las películas.

    const pelicula = async (nombrePelicula) => {
        try{
            const response = await fetch(`http://localhost:5000/peliculas/${nombrePelicula}`)
            const data = await response.json()
            setPeli(data)
        }catch(error){
            console.log(error)
        }

        // Recorriendo el arreglo de películas para devolver la película que se busca.
        console.log(peli.rows[0].nombre)
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
                        //console.log(nombrePelicula)
                        pelicula(nombrePelicula)
                    }}
                
                    >Solicitar Película</button>

                {/* Verificando que peli no esté vacío */}
                {peli.length !== 0 ? (
                    <div>
                        <h1 className="tituloPelicula">{peli.rows[0].nombre}</h1>
                        <a href={peli.rows[0].link} className="Link">Link</a>
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