const express = require("express");
const router = express.Router();
const volunteersController = require("../controllers/volunteer.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Cria uma nova instância do roteador do Express para definir as rotas protegidas
router.get(
  "/dashboard",
  authMiddleware.verifyAdmin,
  volunteersController.dashboard
);

router.get("/", volunteersController.getVolunteers);
router.post("/", authMiddleware.verifyAdmin, volunteersController.newVolunteer);
router.put("/", authMiddleware.verifyAdmin, volunteersController.updateVolunteer);
router.delete("/", authMiddleware.verifyAdmin, volunteersController.deleteVolunteer);

// Define a rota GET /admin que chama o método adminOnly do volunteersController
module.exports = router;
// Exporta o roteador configurado para ser utilizado na aplicação
