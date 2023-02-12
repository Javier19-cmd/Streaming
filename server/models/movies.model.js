import mongoose from "mongoose"
const Schema = mongoose.Schema

// Creando el esquema para buscar películas.

const moviesSchema = new Schema({
    nombre: {
        type: String,
    },
    fecha: {
        type: Date,
    },
    premios: {
        type: Array,
    },
    actores: {
        type: Array,
    },
})

// Creando el modelo.
const Movie = mongoose.model("peliculas", moviesSchema)

export default Movie;