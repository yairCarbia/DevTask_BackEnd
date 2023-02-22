import express from "express"
import {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
} from "../controllers/tareaController.js"
import authMiddleware from "../middleware/authMiddleware.js"
const router = express.Router();

router.post("/", authMiddleware, agregarTarea);
router.route("/:id")
    .get(authMiddleware, obtenerTarea)
    .put(authMiddleware, actualizarTarea)
    .delete(authMiddleware, eliminarTarea);

router.post("/estado/:id", authMiddleware, cambiarEstado);

export default router;