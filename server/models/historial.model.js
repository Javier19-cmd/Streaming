// Modelo para la colección 'historial' de la base de datos.

import mongoose from "mongoose"
const Schema = mongoose.Schema

// Creando el esquema.
const historialSchema = new Schema({
    usuario: {
        type: String,
        required: true
    },
    // Enviando el id del usuario como tipo de dato ObjectId.
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: "usuarios"
    },
    pelicula: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

const Historial = mongoose.model("historial", historialSchema)

export default Historial