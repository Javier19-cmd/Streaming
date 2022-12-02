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

// Obteniendo todos los usuarios.
app.get('/usuarioss', async (req, res) => {
    try {
        const usuarios = await pool.query("SELECT * FROM usuarios")
        res.json(usuarios.rows)
    } catch (error) {
        console.log(error.message)
    }
})

// Obteniendo el usuario y la contraseña de la base de datos.
app.get('/usuarios', async (req, res) => {
    try {
        const usuario = req.body.usuario
        const contrasena = req.body.contrasena
        const usuarioEncontrado = await pool.query('SELECT usuario, contrasena FROM usuarios WHERE usuario = $1 AND contrasena = $2', [usuario, contrasena])
        res.json(usuarioEncontrado)
        // console.log(usuarioEncontrado.rows[0].usuario)
        // console.log(usuarioEncontrado.rows[0].contrasena)
    } catch (error) {
        console.log(error.message)
    }
})

// Método para insertar datos en la tabla de usuarios.
app.post('/usuariosIns', async (req, res) => {
    try {
        
        const usuario = req.body.usuario
        const contrasena = req.body.contrasena
        const newUser = await pool.query('INSERT INTO usuarios (usuario, contrasena) VALUES ($1, $2) RETURNING *', [usuario, contrasena]) 
        // conection es la tabla. mensajeExito es la columna. $1 es el valor. RETURNING * sirve para devolver todos los datos de la tabla. 
        //[description] es el valor que se va a insertar en la tabla.
        // El RETURNING * hay que verlo en postman para ver que nos devuelve.
        res.json(newUser) // El json es para enviar los datos.

    } catch (error) {
        console.log(error.message)
    }
})

// Petición para obtener el link de la película.
app.get('/peliculas', async (req, res) => {
    try {
        const nombrePelicula = req.body.nombrePelicula
        // Usando el operador LIKE para buscar una película.
        const peliculaEncontrada = await pool.query('SELECT link FROM pelis WHERE nombre LIKE $1', ['%' + nombrePelicula + '%'])
        res.json(peliculaEncontrada)
    } catch (error) {
        console.log(error.message)
    }
})