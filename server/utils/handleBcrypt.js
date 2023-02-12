import bcrypt from "bcryptjs";

export const encrypt = async (textPplain) => {
    return await bcrypt.hash(textPplain, 10);
}

const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
}