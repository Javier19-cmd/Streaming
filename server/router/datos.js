
/**
 * Referencia: https://youtu.be/rML1UPvXVFM?t=515
*/

import express from 'express'
const getter = express.Router()

// Referencia a los modelos de los datos.
import Datos from '../models/datos.model.js'
import insert from '../models/insert.model.js'

// Obtener datos.
getter.get('/', async (req, res) => {
    try {
        insert.find({}, (error, datos) => {
            if (error) {
                console.log(error)
            } else {
                res.json(datos)
            }
        })
    } catch (error){
        console.log(error.message)
    }
})

// Exportando el router del getter.
export default getter