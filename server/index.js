/**
 * Referncias: 
 * Curso PERN en React: https://www.youtube.com/watch?v=ldYcgPKEZC8
 * Usando nodemon: https://www.youtube.com/watch?v=Uw3faNl_O0w
 * 
*/

// Importando express.
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'

// Importando los routers. 
import router from './router/datos.js'
import insert from './router/insert.js'
import movie from './router/movies.js'


const app = express()
const PORT = process.env.PORT || 5000


app.use(cors()) // Configuarando CORS.
app.use(express.json()) // Configuración de body-server.



// Conexión a la BDD.
mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.ko8ocfl.mongodb.net/Prueba?retryWrites=true&w=majority", 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Conectado a la base de datos"))
    .catch((error) => console.log(error.message)
    )
    
// Listener.
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})


app.use('/datos', router) // Retraer datos.
app.use('/user', insert) // Insertar datos.
app.use('/movies', movie) // Retraer datos de la BDD de películas.