import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {
  const jwtConfig = {
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
  };

  if (!jwtConfig.secret) {
    return res.status(500).json({
      success: false,
      message: 'Configuración del servidor inválida: falta JWT_SECRET',
    });
  }

  const token = req.header('x-token') || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No se proporcionó un token',
      error: 'MISSING_TOKEN',
    });
  }

  try {
    const verifyOptions = {};
    if (jwtConfig.issuer) verifyOptions.issuer = jwtConfig.issuer;
    if (jwtConfig.audience) verifyOptions.audience = jwtConfig.audience;

    const decoded = jwt.verify(token, jwtConfig.secret, verifyOptions);

    // Seteamos req.user con el campo 'id' extraído del 'sub' del token
    req.user = {
      id: decoded.sub, 
      role: decoded.role || 'USER_ROLE',
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
      error: error.name,
    });
  }
};