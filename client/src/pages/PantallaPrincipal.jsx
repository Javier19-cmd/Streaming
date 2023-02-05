import "./PantallaPrincipal.css"
import {React, useState} from "react"
import ReactPlayer from 'react-player'
import { useParams } from "react-router-dom"

const reprod = (link) => {

    console.log(link)

    return (
        <ReactPlayer className="pelicula" url={link} controls={true} />
    )
}

const Like = (usuario, pelicula, link) => {
    console.log(usuario)
    console.log(pelicula)
    console.log(link)

    // Obteniendo el id del usuario.
    const id_user = usuario.id
    console.log(id_user)

    // Enviando los datos al servidor.
    try {
        fetch('http://localhost:5000/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario: usuario,
                id: id_user,
                pelicula: pelicula,
                link: link
            })
        })
    } catch (error) {
        console.log(error)
    }
}

const PantallaPrincipal = () => {
    const [peli, setPeli] = useState([]) // Arreglo para guardar las películas.

    const {usuario, id} = useParams()

    console.log("Usuario en la pantalla principal", usuario)
    console.log("Id del usuario", id)


    const pelicula = async (nombrePelicula) => { // Método para solicitar la película.
    
        // Solicitando la película.
        try{
            // Haciendo la petición.
            const response = await fetch(`http://localhost:5000/movies/${nombrePelicula}`)
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
        
                                        {/* Creando un botón para reproducir la película deseada */}

                                        <button className="btnReproducirPelicula"
                                            
                                            onClick={() => {
                                                const video = pelicula.Link
                                                reprod(video)
                                            }}

                                        >Reproducir Película</button>

                                        <button 
                                            className="btnLike"
                                            
                                            /* Obteniendo el usuario y la película a dar like*/
                                            onClick={() => {
                                                const pel = pelicula.nombre // Nombre de la película.
                                                const link = pelicula.Link // Link de la película.
                                                Like(usuario, pel, link)

                                            }}
                                            >Like</button>

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