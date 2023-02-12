import History from "../models/history.model.js"

export const createHistory = async (req, res) => {
    const newHistory = new History({
        usuario: req.body.usuario,
        id: req.body.id,
        pelicula: req.body.pelicula,
        link: req.body.link
    })

    // Guardando el historial.
    await newHistory.save()
    .then(() => { res.json('Historial creado con éxito.') })
    .catch((error) => { res.status(400).json('Error: ' + error) })
}