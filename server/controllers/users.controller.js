import { User } from "../models/users.model.js"
import { encrypt, compare, parseJwt } from "../utils/auth.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

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

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombres, apellidos, imagen, telefono, direccion } = req.body;
        await User.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, { contacto: { telefono } }, { new: true });
        res.status(201).json({code: 201, msg: 'Usuario actualizado satisfactoriamente.'});
    } catch(err) {
        res.status(500).json({ code: 500, msg: 'Error: ' + err }) 
    }
}

export const updateUser1 = async (req, res) => {
    try {
        const id = req.params.id;
        await User.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $unset: { 'contacto.telefono': 1 } });
        res.status(201).json({code: 201, msg: 'Usuario actualizado satisfactoriamente.'});
    } catch(err) {
        res.status(500).json({ code: 500, msg: 'Error: ' + err }) 
    }
}

export const getUser = async (req, res) => {
    try {
        const tokenInfo = parseJwt(req.token);
        const user = await User.findOne({_id: mongoose.Types.ObjectId(tokenInfo.id)}, {contrasena: 0});
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({ code: 500, msg: 'Error: ' + err }) 
    }
}