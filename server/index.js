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

app.use(cors()) // Configuarando CORS.
app.use(express.json()) // Configuración de body-server.

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el servidor: ${PORT}`)
})