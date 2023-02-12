import User from "../models/users.model.js"
import { encrypt, compare } from "../utils/auth.js";
import jwt from 'jsonwebtoken';

export const login = async (req, res) => { 
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ correo: email });
        if(!user) return res.status(404).json({ code: 404, msg: 'Usuario no encontrado, correo inválido.' }) 
        const checkPassword = await compare(password, user.contrasena);
        if(!checkPassword) return res.status(400).json({ code: 400, msg: 'Contraseña inválida.' });
        jwt.sign({id: user._id, email: user.correo}, 'secret', {expiresIn: '365 days'}, async (err, token) => {            
            if(err) return res.status(400).json({code: '400', msg: 'Error al generar el token.', err});
            return res.status(200).send({code: '200', msg: 'Sesión iniciada exitósamente.', user: {id: user._id, email: user.correo}, token});
        });
    } catch(err) {
        res.status(500).json({ code: 500, msg: 'Error: ' + err }) 
    }
}

export const register = async (req, res) => { 
    try {
        const { email, password } = req.body;
        const passwordHash = await encrypt(password);
        const usuario = new User({correo: email, contrasena: passwordHash});
        await usuario.save().then(() => { 
            res.json({code: 200, msg: 'Usuario registrado satisfactoriamente.'}) 
        }).catch((error) => { 
            res.status(400).json({ code: 400, msg: 'Error: ' + error }) 
        });
    } catch(err) {
        res.status(500).json({ code: 500, msg: 'Error: ' + err }) 
    }
}