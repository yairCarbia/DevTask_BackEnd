import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { usuarios, registrar, auntenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil } from "../controllers/usuarioController.js";
const usuarioRoutes = express.Router();

usuarioRoutes.get("/", usuarios);
usuarioRoutes.post("/", registrar);
usuarioRoutes.post("/login", auntenticar);
usuarioRoutes.get("/confirmar/:token", confirmar);
usuarioRoutes.post("/olvide-password", olvidePassword);
usuarioRoutes.get("/olvide-password/:token", comprobarToken);
usuarioRoutes.post("/olvide-password/:token", nuevoPassword)
usuarioRoutes.get("/perfil", authMiddleware, perfil)
export default usuarioRoutes;