/**
 * Referencia: 
 * https://www.youtube.com/watch?v=fMG3DeocjW4&ab_channel=Codentineinc
 * https://github.com/beaucarnes/mern-exercise-tracker-mongodb/tree/master/backend
 */
import mongoose from "mongoose"
const Schema = mongoose.Schema

// Creando el esquema para insertar y consultar usuarios.
const userSchema = new Schema({
    correo: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    }
})

// Creando el modelo.
const User = mongoose.model("usuarios", userSchema);

// Exportando el modelo.
export default User;