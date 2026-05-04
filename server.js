const { app, logger } = require('./src/app');
const PORT = process.env.PORT || 3000;

// Inicialização do servidor
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação: http://localhost:${PORT}/api-docs`);
});