import User from "../models/users.model.js"
import { encrypt } from "../utils/handleBcrypt.js";

export const login = async (req, res) => { 

}

export const register = async (req, res) => { 
    const { email, password } = req.body;
    const passwordHash = await encrypt(password);
    const usuario = new User({email, password: passwordHash});
    await usuario.save().then(() => { res.json('Datos insertados') })
    .catch((error) => { res.status(400).json('Error: ' + error) })
}