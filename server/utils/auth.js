import bcrypt from "bcryptjs";

export const encrypt = async (textPplain) => {
    return await bcrypt.hash(textPplain, 10);
}

export const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
}

export const verifyToken = (req, res, next) => {
    const time = new Date().getTime();
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        return res.status(401).send({code: "401", details: `Token de autorización es necesario.`});
    }
}