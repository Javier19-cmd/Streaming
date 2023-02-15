/**
 * Referencia: 
 * https://www.youtube.com/watch?v=fMG3DeocjW4&ab_channel=Codentineinc
 * https://github.com/beaucarnes/mern-exercise-tracker-mongodb/tree/master/backend
 */
import mongoose, { Schema } from "mongoose"

// Creando el esquema para insertar y consultar usuarios.
const userSchema = new mongoose.Schema({
    correo: {
        type: String,   
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    telefonos: {
        type: [String],
        required: false
    },
    nombres: {
        type: String,
        required: false
    },
    apellidos: {
        type: String,
        required: false
    },
    imagen: {
        type: Schema.Types.ObjectId,
        required: false
    }
})

// Creando el modelo & exportando el modelo.
export const User = mongoose.model("usuarios", userSchema);
