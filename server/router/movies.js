import express from 'express'
const movie = express.Router()

import movies from '../models/movies.model.js'

// Obteniendo los datos.
movie.get('/:dato', async (req, res) => {
    // Buscando los datos por cualquier campo.
    const search  = req.params.dato

    console.log(search)
    // Buscando los datos.
    await movies.find(
        {nombre: {$regex: `.*${search}.*`, $options: 'i'}},)
    .then((data) => { res.json(data) })
    .catch((error) => { res.status(400).json('Error: ' + error) })
})


// Exportando el router del getter.
export default movie