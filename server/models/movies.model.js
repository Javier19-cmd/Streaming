import mongoose from "mongoose"
const Schema = mongoose.Schema

// Creando el esquema para buscar películas.

const moviesSchema = new Schema({
    nombre: {
        type: String,
    },
    fecha: {
        type: String,
    },
    premios: {
        type: Array,
    },
    actores: {
        type: Array,
    },
})

// Creando el modelo.
const movies = mongoose.model("pelis", moviesSchema)

export default movies