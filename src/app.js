const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./docs/swagger");

// 1. Importações atualizadas (saem events e volunteers, entra menu)
const authRoutes = require("./routes/auth.routes");
const menuRoutes = require("./routes/menu.routes"); 

const { requestLogger } = require("./middlewares/requestLogger");
const { errorHandler } = require("./middlewares/errorHandler");
const { logger } = require("./logger");

const app = express();
app.use(requestLogger);

app.use(cors());

app.use(express.json());

// 2. Registro das rotas atualizado
app.use("/auth", authRoutes);
app.use("/menus", menuRoutes); 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware de erro (sempre por último)
app.use(errorHandler);

// Exporta o app e o logger
module.exports = { app, logger };