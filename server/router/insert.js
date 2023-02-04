/**
 * Referencia: 
 * https://www.youtube.com/watch?v=fMG3DeocjW4&ab_channel=Codentineinc
 * https://github.com/beaucarnes/mern-exercise-tracker-mongodb/tree/master/backend
 */
import express from 'express'
const router = express.Router()

import insert from '../models/insert.model.js'

// Insertar datos.
router.post('/', async (req, res) => {
    const correo = new insert(req.body)
    const contrasena = new insert(req.body)

    console.log(correo)

    await correo.save()
    .then(() => { res.json('Datos insertados') })
    .catch((error) => { res.status(400).json('Error: ' + error) })

})

export default router