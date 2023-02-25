
import express from "express"
import { Server } from "socket.io";
import dotenv from "dotenv"
import cors from "cors";
import connectionDb from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRouter from "./routes/tareaRoutes.js";
//Servidor
dotenv.config();
const app = express();
app.use(express.json());
//Conexion MONGODB
connectionDb();
//Configurar CORS
const whiteList = [process.env.CORS_URL];
const corsOptions = {
    origin: function (origin, callback) {
        console.log(origin);
        if (whiteList.includes(origin)) { callback(null, true) }
        else { callback(new Error("¿Que haces enviando peticiones desde una URL desconocida?")) }
    }

};
app.use(cors(corsOptions));
//Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRouter);
const servidor = app.listen(4000, () => { console.log("Servidor corriendo en el puerto 4000") });




const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CORS_URL,
    },
});

io.on("connection", (socket) => {
    // console.log("Conectado a socket.io");

    // Definir los eventos de socket io
    socket.on("abrir proyecto", (proyecto) => {
        socket.join(proyecto);
    });

    socket.on("nueva tarea", (tarea) => {
        const proyecto = tarea.proyecto;
        socket.to(proyecto).emit("tarea agregada", tarea);
    });

    socket.on("eliminar tarea", (tarea) => {
        const proyecto = tarea.proyecto;
        socket.to(proyecto).emit("tarea eliminada", tarea);
    });

    socket.on("actualizar tarea", (tarea) => {
        const proyecto = tarea.proyecto._id;
        socket.to(proyecto).emit("tarea actualizada", tarea);
    });

    socket.on("cambiar estado", (tarea) => {
        const proyecto = tarea.proyecto._id;
        socket.to(proyecto).emit("nuevo estado", tarea);
    });
});

