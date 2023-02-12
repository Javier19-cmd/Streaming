import Movie from "../models/movies.model.js";

export const createMovie = async (req, res) => {
    // Buscando los datos por cualquier campo.
    const search  = req.params.dato

    console.log(search)
    // Buscando los datos.
    await Movie.find(
        {nombre: {$regex: `.*${search}.*`, $options: 'i'}},)
    .then((data) => { res.json(data) })
    .catch((error) => { res.status(400).json('Error: ' + error) })
} 