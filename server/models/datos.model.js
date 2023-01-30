import mongoose from "mongoose"
const Schema = mongoose.Schema

// Creando el esquema.
const datosSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }
})

// Creando el modelo.
const Datos = mongoose.model("prueba", datosSchema)

export default Datos