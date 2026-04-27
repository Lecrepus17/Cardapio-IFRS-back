// Exporta um objeto de configuração usado pelo PM2
module.exports = {
  apps: [
    {
      // Nome da aplicação dentro do PM2 (aparece no "pm2 list")
      name: "api-pm2-demo",
      // Arquivo principal da aplicação Node.js
      script: "server.js",
      // Número de instâncias do processo (1 = modo único; use "max" para todos os núcleos)
      instances: 1,
      // Modo de execução:
      // "fork" = um único processo; "cluster" = várias instâncias balanceadas
      exec_mode: "fork",
      // Observa mudanças no código e reinicia automaticamente (apenas para desenvolvimento)
      watch: process.env.WATCH === "true",
      // Ignora essas pastas ao monitorar alterações (para evitar reinícios desnecessários)
      ignore_watch: ["node_modules", "logs"],
      // Define variáveis de ambiente
      env_development: {
        NODE_ENV: "development",
        WATCH: "true",
      },
      env_production: {
        NODE_ENV: "production",
        WATCH: "false",
      },
      // Caminho do arquivo de log de erros
      error_file: "logs/err.log",
      // Caminho do arquivo de log padrão (saída normal)
      out_file: "logs/out.log",
      // Formato de data exibido nos logs do PM2
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      // Reinicia automaticamente o processo se ultrapassar 300 MB de uso de memória
      max_memory_restart: "300M",
    },
  ],
};
