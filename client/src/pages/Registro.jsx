import "./Registro.css"

const hmac = (contrasena) => {
    // Darle la vuelta a la contraseña.
    let contrasenaInvertida = contrasena.split("").reverse().join("")
    // console.log(contrasenaInvertida)
    return contrasenaInvertida
}

// Método para enviar los datos del usuario a la base de datos.
const enviarDatos = async (usuario, contrasena) => {
    try {
        const response = await fetch("http://localhost:5000/usuariosIns", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: usuario,
                contrasena: contrasena
            })
        })
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

// Objetos con los que el usuario interactúa.
const Registro = () => {

    return (
        <div>
            <h1 className="titulo">Bienvenido a la pantalla de registro del sistema de streaming</h1>
            {/* Formulario para registrar un nuevo usuario */}
            
            <label className="Cor">Correo</label>
            <input type="text" placeholder="Usuario" className="txtUsuarioo"/>
            <label className="Con">Contraseña</label>
            <input type="password" placeholder="Contrasena" className="txtContrasenaa"/>
            <button className="btnRegistrar" onClick={
                () => {
                    const usuario = document.querySelector(".txtUsuarioo").value
                    const contrasena = document.querySelector(".txtContrasenaa").value
                    console.log(hmac(contrasena))
                    enviarDatos(usuario, hmac(contrasena))
                }
            }>Registrar</button>
        </div>
    )
}

export default Registro