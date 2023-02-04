import express from 'express'
const movie = express.Router()

import movies from '../models/movies.model.js'

// Obteniendo los datos.
movie.get('/', async (req, res) => {
    // Buscando los datos por cualquier campo.
    const search = req.query

    // Creando una búsqueda como like en SQL.
    const regex = new RegExp(search.nombre, 'i')

    // Buscando los datos.
    await movies.find({nombre: regex})
    .then((data) => { res.json(data) })
    .catch((error) => { res.status(400).json('Error: ' + error) })
})


// Exportando el router del getter.
export default movie