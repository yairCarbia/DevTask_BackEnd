import express from "express";
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    buscarColaborador,
    eliminarColaborador,
    obtenerTareas
} from "../controllers/proyectoContoller.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/")
    .get(authMiddleware, obtenerProyectos)
    .post(authMiddleware, nuevoProyecto);

router
    .route("/:id")
    .get(authMiddleware, obtenerProyecto)
    .put(authMiddleware, editarProyecto)
    .delete(authMiddleware, eliminarProyecto);

router.post("/colaboradores", authMiddleware, buscarColaborador)
// router.get("/tareas/:id", authMiddleware, obtenerTareas);
router.post("/colaboradores/:id", authMiddleware, agregarColaborador)
router.post("/eliminar-colaborador/:id", authMiddleware, eliminarColaborador)

export default router;