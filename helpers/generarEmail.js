import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
    const { nombre, email, token } = datos;
    const transport = nodemailer.createTransport({
        service: 'gmail',
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"DevzTask - Administrador de Proyectos"',
        to: email,
        subject: "DevzTask - Confirma tu cuenta",
        text: "Comprueba tu cuenta en DevzTask",
        html: `
        <h1>Hola ${nombre}!</h1>
        <p>Comproba tu cuenta en DevzTask y comenza a administrar tus Proyectos.</p>
        <a href="${process.env.CORS_URL}/confirmar/${token}">Comprobar Cuenta </a>
        <p>Si no creaste esta cuenta,ignora este mensaje.</p>
        `
    }



    )


};

export const emailRecuperarContraseña = async (datos) => {
    const { nombre, email, token } = datos;
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"DevzTask - Administrador de Proyectos"',
        to: email,
        subject: "DevzTask - Reestablecer contraseña",
        text: "Reestablecer contraseña en DevzTask",
        html: `
        <h1>Hola ${nombre}!</h1>
        <p> Reestablece tu contraseña en DevzTask y comenza a administrar tus Proyectos.</p>
        <p>Sigue el siguiente enlace:</p>
        <a href="${process.env.CORS_URL}/olvide-password/${token}">Reestablecer contraseña</a>
        
        `
    }



    )
};


