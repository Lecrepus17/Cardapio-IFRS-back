const jwt = require("jsonwebtoken");

/**
 * @class AuthMiddleware
 * @description Middleware para autenticação e autorização de usuários
 */
class AuthMiddleware {
  /**
   * Verifica se o token JWT fornecido é válido
   * @static
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} req.headers - Headers da requisição
   * @param {string} [req.headers.authorization] - Token JWT no formato "Bearer <token>"
   * @param {Object} res - Objeto de resposta Express
   * @param {Function} next - Função para passar controle ao próximo middleware
   * @returns {void}
   * @description Se o token for válido, adiciona os dados decodificados em req.user e chama next()
   */
  static verifyToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token não fornecido" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ error: "Token inválido" });
    }
  }

  /**
   * Verifica se o usuário é administrador
   * @static
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   * @param {Function} next - Função para passar controle ao próximo middleware
   * @returns {void}
   * @description Primeiro valida o token, depois verifica se a role do usuário é "admin"
   */
  static verifyAdmin(req, res, next) {
    AuthMiddleware.verifyToken(req, res, () => {
      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Acesso negado" });
      }
      next();
    });
  }
}

module.exports = AuthMiddleware;
