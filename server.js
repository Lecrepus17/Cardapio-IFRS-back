// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();
// Importa a aplicação Express configurada em src/app.js
const { app, logger } = require("./src/app");
// Define a porta e o host pelas variáveis de ambiente ou usa valores padrão
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
/**
 * Inicia o servidor Express na porta e host definidos.
 * Quando o servidor é iniciado com sucesso, exibe um log estruturado (JSON)
 * com o nível "info" e informações sobre a porta e o ambiente.
 */
const server = app.listen(PORT, HOST, () => {
  logger.info(
    JSON.stringify({
      level: "info",
      message: "server:start",
      port: PORT,
      env: process.env.NODE_ENV, // indica o ambiente (ex: development)
    })
  );
});
/**
 * Função responsável por realizar o desligamento controlado do servidor.
 * Ao receber um sinal do sistema (como Ctrl+C ou kill), o servidor é encerrado
 * de forma segura, permitindo que requisições em andamento sejam finalizadas
 */
function shutdown(signal) {
  console.log(
    JSON.stringify({
      level: "warn",
      message: "server:shutdown",
      signal, // sinal recebido (SIGINT ou SIGTERM)
    })
  );
  // Fecha o servidor e encerra o processo com código 0 (sem erro)
  server.close(() => process.exit(0));
}
// Escuta sinais do sistema operacional para encerramento gracioso (graceful shutdown)
process.on("SIGINT", () => shutdown("SIGINT")); // Interrupção manual Ctrl + C;
process.on("SIGTERM", () => shutdown("SIGTERM")); // Encerramento pelo sistema (ex: PM2 ou container)
