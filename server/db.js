/**
 * Referencias: 
 * 1. Importar un archivo .env: https://www.npmjs.com/package/dotenv
*/
import mongoose from "mongoose"

const password = process.env.PASSWORD
const dbname = "test"
const uri = "mongodb+srv://admin:admin@cluster0.ko8ocfl.mongodb.net/test?retryWrites=true&w=majority"

module.exports = () => mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})