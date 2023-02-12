import Like from "../models/likes.model.js"

export const saveLike = async (req, res) => {
    // Creando una nueva instancia del modelo.
    const newLike = new Like({
        usuario: req.body.usuario,
        id: req.body.id,
        pelicula: req.body.pelicula,
        link: req.body.link
    })

    // Guardando el like.
    await newLike.save()
    .then(() => { res.json('Like creado con éxito.') })
    .catch((error) => { res.status(400).json('Error: ' + error) })
}