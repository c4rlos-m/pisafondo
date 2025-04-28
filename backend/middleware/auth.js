// middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware para verificar el JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  console.log("Token recibido en el middleware:", token);

  if (!token) {
    return res.status(403).json({ error: 'Acceso denegado, token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guarda id y role en req.user
    next();
  } catch (err) {
    console.log("Error al verificar el token:", err);
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

// Middleware para verificar si el usuario es admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado, se requiere rol de administrador' });
  }
  next();
};

module.exports = { authenticateJWT, requireAdmin };