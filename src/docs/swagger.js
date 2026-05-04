const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Cardápio IFRS',
    version: '1.0.0',
    description: 'API para gerenciamento de cardápios do IFRS',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desenvolvimento',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

module.exports = swaggerDefinition;