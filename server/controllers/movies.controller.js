import Movie from "../models/movies.model.js";

export const searchMovie = async (req, res) => {
    // Buscando los datos por cualquier campo.
    const search  = req.params.dato

    console.log(search)
    // Buscando los datos.
    await Movie.find({
        $or: [
            {nombre: {$regex: `.*${search}.*`, $options: 'i'}},
            {actores: {$elemMatch: {$regex: `.*${search}.*`, $options: 'i'}}},
            {generos: {$elemMatch: {$regex: `.*${search}.*`, $options: 'i'}}},
        ], 
        $group: {
            _id: "$generos"
        }
        })
        .sort({nombre: 1})
        .limit(10)
        .then((data) => { res.json(data) })
        .catch((error) => { res.status(400).json('Error: ' + error) })
}

export const listMovies = async (req, res) => {
    // Buscando los datos por cualquier campo.
    const search  = req.params.dato

    console.log(search)
    // Buscando los datos.
    await Movie.find({})
        .sort({nombre: 1})
        .limit(10)
        .then((data) => { res.json(data) })
        .catch((error) => { res.status(400).json('Error: ' + error) })
}


export const listMovies1 = async (req, res) => {
    // Buscando los datos por cualquier campo.
    const search  = req.params.dato

    console.log(search)
    // Buscando los datos.
    await Movie.aggregate([
        {$project: {nombre: 1}}
    ]).limit(10)
        .then((data) => { res.json(data) })
        .catch((error) => { res.status(400).json('Error: ' + error) })
}