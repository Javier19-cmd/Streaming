/**
 * Referncias: 
 * Curso PERN en React: https://www.youtube.com/watch?v=ldYcgPKEZC8
 * Usando nodemon: https://www.youtube.com/watch?v=Uw3faNl_O0w
 * 
*/

// Importando express.
import express from 'express'
import cors from 'cors'
const PORT = process.env.PORT || 5000
const app = express()
import pool from './db.js'

app.use(cors()) // Configuarando CORS.
app.use(express.json()) // Configuración de body-server.

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`)
})

// El async hace el request más fácil.
app.post('/todos', async (req, res) => {
    try {
        
        const { description } = req.body // Se destructura la descripción que se manda.
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description]) 
        // conection es la tabla. mensajeExito es la columna. $1 es el valor. RETURNING * sirve para devolver todos los datos de la tabla. 
        //[description] es el valor que se va a insertar en la tabla.
        // El RETURNING * hay que verlo en postman para ver que nos devuelve.
        res.json(newTodo) // El json es para enviar los datos.

    } catch (error) {
        console.log(error.message)
    }
})

// Insertando datos dentro de la tabla de usuarios.
app.post('/users', async (req, res) => {
    try {
        
        const { description } = req.body // Se destructura la descripción que se manda.
        const newUser = await pool.query('INSERT INTO usuarios (usuario) VALUES ($1) RETURNING *', [description]) 
        // conection es la tabla. mensajeExito es la columna. $1 es el valor. RETURNING * sirve para devolver todos los datos de la tabla. 
        //[description] es el valor que se va a insertar en la tabla.
        // El RETURNING * hay que verlo en postman para ver que nos devuelve.
        res.json(newUser) // El json es para enviar los datos.

    } catch (error) {
        console.log(error.message)
    }
})