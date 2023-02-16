import mongoose from "mongoose"
import Like from "../models/likes.model.js"

export const saveLike = async (req, res) => {
    // Creando una nueva instancia del modelo.
    const newLike = new Like({
        usuario: req.body.usuario,
        id: req.body.id,
        pelicula: req.body.pelicula,
        link: req.body.link
    })

    // Guardando los datos en la base de datos.
    await newLike.save()
        .then(() => {
            res.json('Like guardado')
        })
        .catch((error) => {
            res.status(400).json('Error: ' + error)
        })
}

export const deleteLike = async (req, res) => {
    try {
        const id = req.params.id;
        await Like.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(id)
        });
        res.status(200).json({
            code: 200,
            msg: 'Like eliminado satisfactoriamente.'
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            msg: 'Error: ' + err
        })
    }
}