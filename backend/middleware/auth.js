// middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware para verificar el JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    console.log("Token recibido en el middleware:", token);  // Ver el token recibido

    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado, token requerido' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Guardar los datos del usuario decodificados en la solicitud
        next();  // Continuar con la ejecución de la siguiente función/middleware
    } catch (err) {
        console.log("Error al verificar el token:", err);
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
};

module.exports = authenticateJWT;
