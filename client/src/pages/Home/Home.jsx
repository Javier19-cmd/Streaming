import "./Home.css";
import {React, useState, useEffect} from "react";
import ReactPlayer from 'react-player';
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Navbar.jsx";

const Like = (usuario,id_user, pelicula, link) => {
    // console.log(usuario)
    // console.log(pelicula)
    // console.log(link)

    // Obteniendo el id del usuario.
    //const id_user = usuario.id
    console.log(id_user)

    // Enviando los datos al servidor.
    try {
        fetch('http://localhost:5000/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                usuario: usuario,
                id_usuario: id_user,
                pelicula: pelicula,
                link: link
            })
        })
    } catch (error) {
        alert("No se puede dar like dos veces a la misma película")
    }
}

const historial = (usuario, id_user, pelicula, link) => { // Método para mandar los videos que se reproducen a la colección 'historial'.
    console.log("Datos para mandar al historial: ", usuario, pelicula, link)
    console.log("Id del usuario: ", id_user)

    // Enviando los datos al servidor.
    try {
        fetch('http://localhost:5000/historial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                usuario: usuario,
                id_usuario: id_user,
                pelicula: pelicula,
                link: link
            })
        })
    } catch (error) {
        alert("Ha ocurrido un error al mandar los datos al historial")
    }
}

const Home = () => {
    const [peli, setPeli] = useState([]) // Arreglo para guardar las películas.

    const [showVideo, setShowVideo] = useState(false) // Variable para mostrar el video.

    const {usuario, id} = useParams()

    const [pel, setPel] = useState([]) // Arreglo para jalar películas "aleatorias".

    const [pelAct, setPelAct] = useState([]) // Arreglo para enseñar el video.

    const Pel = async () => { // Método para jalar películas "aleatorias".
        // Solicitando la película.
        try{
            // Haciendo la petición.
            const response = await axios.get(`http://localhost:5000/movies/`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            // Convirtiendo la respuesta a JSON.
            const data = await response.data;
            setPel(data)
            console.log(data)
        }catch(error){
            console.log(error)
        }
    
    }


    useEffect(() => {
        Pel()
        document.body.style.backgroundColor = '#1E855F';
        document.body.style.backgroundImage = "none";
      }, [])

    // console.log("Usuario en la pantalla principal", usuario)
    //console.log("Id del usuario", id)

    const handleClick = () => {
        setShowVideo(true)
    } // Método para reproducir el video.

    const pelicula = async (nombrePelicula) => { // Método para solicitar la película.
    
        // Solicitando la película.
        try{
            // Haciendo la petición.
            const response = await axios.get(`http://localhost:5000/movies/${nombrePelicula}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            // Convirtiendo la respuesta a JSON.
            const data = await response.data;
            setPeli(data)
            console.log(data)
        }catch(error){
            console.log(error)
        }
    }
    
    return (
            <div className="Todo">
                <NavBar />
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
                    
                    <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 0.5fr)",
                            gridTemplateRows: "repeat(5, 0.5fr)",
                            gridGap: "20px",
                            width: "100%"
                    }}>
                        {/* Recorriendo e imprimiendo la lista de películas */}
                        
                        {
                            peli.map((pelicula, i) => {
                                return(
                                    <div key={i} className="Pelicula">
                                        <h1 className="NombrePelicula"
                                        
                                            /*Colocando el título encima de los botones */
                                            style={{
                                                position: "relative",
                                                zIndex: "1"
                                            }}

                                        >{pelicula.nombre}</h1>
        
                                        {/* Creando un botón para reproducir la película deseada */}

                                        <button className="btnReproducirPelicula"
                                            onClick={
                                                () => {
                                                    // Enseñando solo el video que se desea reproducir.
                                                    handleClick()
                                                    // Mandando los datos al historial.
                                                    historial(usuario, id, pelicula.nombre, pelicula.link)
                                                    setPelAct(pelicula.link)
                                                }
                                            }
                                            
                                            style={{
                                                    position: "relative",
                                                    backgroundColor: "green",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    padding: "10px",
                                                    fontSize: "20px",
                                                    cursor: "pointer",
                                                    left: "10%",
                                                }}

                                        >Reproducir Película</button>
                                        {
                                            showVideo && (
                                                <ReactPlayer className="videoPelicula" url={pelAct} controls={true}/>
                                            )
                                        }

                                        <button 
                                            className="btnLike"
                                            
                                            /* Obteniendo el usuario y la película a dar like*/
                                            onClick={() => {
                                                const pel = pelicula.nombre // Nombre de la película.
                                                const link = pelicula.link // Link de la película.
                                                Like(usuario, id, pel, link)

                                            }}

                                            style={{
                                                    position: "relative",
                                                    backgroundColor: "green",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    padding: "10px",
                                                    fontSize: "20px",
                                                    cursor: "pointer",
                                                    left: "15%",
                                                }}
                                                
                                            >Like</button>

                                    </div>
                                )
                            })
                        }

                    </div>

                ) : (
                    <>
                        {/* Creando el grid con las películas y los botones de like y reproducir */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 0.5fr)",
                            gridTemplateRows: "repeat(5, 0.5fr)",
                            gridGap: "20px",
                            width: "100%"
                        }}>
                            {
                                pel.map((pelicula, i) => {
                                    return(
                                        <div key={i} className="Pelicula">
                                            <h1 className="NombrePelicula"
                                            
                                                /*Colocando el título encima de los botones */
                                                style={{
                                                    position: "relative",
                                                    zIndex: "1"
                                                }}
                                            >{pelicula.nombre}</h1>
        
                                            {/* Creando un botón para reproducir la película deseada */}
                                            <button className="btnReproducirPelicula"
                                                onClick={
                                                    () => {
                                                        // Enseñando solo el video que se desea reproducir.
                                                        handleClick()
                                                        // Mandando los datos al historial.
                                                        historial(usuario, id, pelicula.nombre, pelicula.link)
                                                        setPelAct(pelicula.link)
                                                    }
                                                }

                                                style={{
                                                    position: "relative",
                                                    backgroundColor: "green",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    padding: "10px",
                                                    fontSize: "20px",
                                                    cursor: "pointer",
                                                    left: "10%",
                                                }}
                                            >Reproducir Película</button>
                                            {
                                                showVideo && (
                                                    <ReactPlayer className="videoPelicula" 
                                                    url={pelAct}
                                                    controls={true}
                                                    
                                                    />
                                                )
                                            }

                                            <button 
                                                className="btnLike"
                                                
                                                /* Obteniendo el usuario y la película a dar like*/
                                                onClick={() => {
                                                    const pel = pelicula.nombre // Nombre de la película.
                                                    const link = pelicula.link // Link de la película.
                                                    Like(usuario, id, pel, link)

                                                }}

                                                style={{
                                                    position: "relative",
                                                    backgroundColor: "green",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    padding: "10px",
                                                    fontSize: "20px",
                                                    cursor: "pointer",
                                                    left: "15%",
                                                }}
                                                >Like</button>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                )}
            </div>
        )
    }
    

export default Home;