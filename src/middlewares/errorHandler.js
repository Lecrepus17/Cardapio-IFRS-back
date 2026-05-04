const { logger } = require("../logger");

/**
 * Middleware para tratamento centralizado de erros
 * @param {Error} err - Objeto de erro capturado
 * @param {Object} req - Objeto de requisição Express
 * @param {string} req.requestId - ID único da requisição para rastreamento
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função para passar controle ao próximo middleware
 * @returns {void}
 * @description Este middleware é executado quando ocorre um erro durante o processamento.
 * Registra o erro no log e retorna uma resposta padronizada ao cliente.
 */
function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  // Dados a serem registrados no log
  const logPayload = {
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl || req.url,
    status,
    stack: err.stack, // pilha de erro (útil para debug)
    name: err.name,
  };
  // Define o nível de log com base no tipo de erro
  const level = status >= 500 ? "error" : "warn";
  logger.log({ level, message: "request:error", ...logPayload });
  // Retorna resposta padronizada ao cliente
  res.status(status).json({
    error: status >= 500 ? "Internal Server Error" : err.message || "Error",
    requestId: req.requestId, // permite rastrear o erro no log
  });
}
module.exports = { errorHandler };
