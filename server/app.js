/**
 * Referncias: 
 * Curso PERN en React: https://www.youtube.com/watch?v=ldYcgPKEZC8
 * Usando nodemon: https://www.youtube.com/watch?v=Uw3faNl_O0w
 * 
 */

// Importando express.
import express from 'express';
import cors from 'cors';
import methodOverride from 'method-override';

// Importando los routers. 
import userRouter from './router/users.router.js';
import movieRouter from './router/movies.router.js';
import likesRouter from './router/likes.router.js';
import historyRouter from './router/history.router.js';
import uploadsRouter from './router/uploads.router.js';

const app = express()

app.use(cors()) // Configuarando CORS.
app.use(methodOverride('_method'))
app.use(express.json()) // Configuración de body-server.

app.use(userRouter) // Usuarios.
app.use(movieRouter) // Retraer datos de la BDD de películas.
app.use(likesRouter) // Retraer datos de la BDD de likes.
app.use(historyRouter) // Retraer datos de la BDD de historial.
app.use(uploadsRouter)

export default app;