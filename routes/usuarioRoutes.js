import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { usuarios, registrar, auntenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil } from "../controllers/usuarioController.js";
const router = express.Router();

router.get("/", usuarios);
router.post("/", registrar);
router.post("/login", auntenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword)
router.get("/perfil", authMiddleware, perfil)
export default router;