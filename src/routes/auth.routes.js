const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
// middleware de erro (sempre no final)
router.use((err, req, res, next) => {
  console.error("Erro capturado:", err);
  res.status(500).json({ message: "Erro interno do servidor" });
});
module.exports = router;
