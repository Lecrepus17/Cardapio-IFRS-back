const jwt = require("jsonwebtoken");

class AuthMiddleware {
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
