// Descripción: Modelo de la colección 'likes' de la base de datos.

import mongoose from "mongoose"
const Schema = mongoose.Schema

// Creando el esquema.
const likesSchema = new Schema({
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
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    }
})

// Creando el modelo.
const Like = mongoose.model("likes", likesSchema)

export default Like