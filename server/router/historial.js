import express from 'express'
const historial = express.Router()

import Historial from '../models/historial.model.js'

// Creando un historial.
historial.post('/', async (req, res) => {
    // Creando una nueva instancia del modelo.
    const newHistorial = new Historial({
        usuario: req.body.usuario,
        id: req.body.id,
        pelicula: req.body.pelicula,
        link: req.body.link
    })

    // Guardando el historial.
    await newHistorial.save()
    .then(() => { res.json('Historial creado con éxito.') })
    .catch((error) => { res.status(400).json('Error: ' + error) })
})

export default historial