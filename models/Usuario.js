import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const usuarioSchema = mongoose.Schema({
    nombre: { type: String, required: true, trim: true },

    password: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, trim: true },

    token: { type: String, },

    confirmado: { type: Boolean, default: false }

}, { timestamps: true });

usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { next(); }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
})

usuarioSchema.methods.comprobarPass = async function (pass) {
    return await bcryptjs.compare(pass, this.password);
}

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;