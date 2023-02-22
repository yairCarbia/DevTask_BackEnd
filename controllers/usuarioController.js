import Usuario from "../models/Usuario.js";
import bcryptjs from "bcryptjs";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailRecuperarContraseña } from "../helpers/generarEmail.js";

const usuarios = (req, res) => {
    res.send("Desde api controller.");
}
const registrar = async (req, res) => {
    //Evitar duplicados 
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message });
    }
    try {
        //Crear obj con la info del Usuario
        const usuario = await new Usuario(req.body);
        usuario.token = generarId();
        await usuario.save();
        //Enviar email de confirmacion.
        emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })
        res.json({ msg: "Usuario creado correctamente, revisa tu email 🙌" });

    } catch (error) {
        console.log(error);
    }
}
const auntenticar = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        const error = new Error("Usuario no registrado");
        res.status(404).json({ msg: error.message });
    }
    if (!usuario.confirmado) {
        const error = new Error("Usuario no confirmado");
        res.status(404).json({ msg: error.message });
    }
    if (await usuario.comprobarPass(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })
    } else {
        const error = new Error("Contraseña INCORRECTA.");
        res.status(404).json({ msg: error.message });
    }

};
const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({ token });
    if (!usuarioConfirmar) {
        const error = new Error("Token INCORRECTO.");
        res.status(404).json({ msg: error.message });
    }
    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";
        await usuarioConfirmar.save();
        res.json({ msg: "Usuario confirmado correctamente." })
    } catch (error) {
        console.log(error);
    }
};

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        const error = new Error("Usuario no registrado");
        res.status(404).json({ msg: error.message });
    }
    try {
        usuario.token = generarId();
        await usuario.save();
        emailRecuperarContraseña({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        });
        res.json({ msg: "Hemos enviado un email con las intrucciones 🙌" })
    } catch (error) {
        console.log(error);
    }

};

const comprobarToken = async (req, res) => {

    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token });
    if (!tokenValido) {
        const error = new Error("Token INCORRECTO.");
        res.status(404).json({ msg: error.message });
    } else {
        res.json({ msg: "Token VALIDO." });
    }
};
const nuevoPassword = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const usuario = await Usuario.findOne({ token });

    if (usuario) {
        usuario.password = password;
        usuario.token = "";
        await usuario.save();
        res.json({ msg: "Password modificado correctamente 🙌" });

    } else {
        const error = new Error("Token INCORRECTO.");
        res.status(404).json({ msg: error.message });
    }
};
const perfil = (req, res) => {
    const { usuario } = req;
    res.json(usuario);
};

export { usuarios, registrar, auntenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil };