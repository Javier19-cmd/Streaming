/**
 * Referncias: 
 * Curso PERN en React: https://www.youtube.com/watch?v=ldYcgPKEZC8
 * Usando nodemon: https://www.youtube.com/watch?v=Uw3faNl_O0w
 * 
*/

// Importando express.
import express from 'express'
import cors from 'cors'
const PORT = process.env.PORT || 3000
const app = express()
import pool from './db.js'

app.use(cors()) // Configuarando CORS.
app.use(express.json()) // Configuración de body-server.

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`)
})

// Insertando dato de prueba.
app.post('/insert', async (req, res) => {

    try{
        const nombre = req.body // Variable para el nombre.
        const newIns = await pool.query("INSERT INTO usuarios (nombre) VALUES ($1)", [nombre])
        res.json(newIns)
    }catch (err){
        console.error(err.message)
    }
})