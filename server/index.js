import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 5000

// Listener.
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
    // Conexión a la BDD.
    mongoose.connect(
            "mongodb+srv://admin:admin@cluster0.ko8ocfl.mongodb.net/Prueba?retryWrites=true&w=majority", {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        .then(() => {
            console.log("Conectado a la base de datos")
        })
        .catch((error) => console.log(error.message))
})