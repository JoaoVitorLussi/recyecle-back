const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  const email = req.headers.email ? req.headers.email.split(' ')[1] : null;
  if (!token) {
    return res.status(401).send({
      type: 'error',
      message: 'Acesso negado! Token não fornecido.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    req.email = email;
    next();
  } catch (ex) {
    console.log(ex)
    res.status(401).send({
      type: 'error',
      message: 'Token inválido.'
    });
  }
};

module.exports = authMiddleware;