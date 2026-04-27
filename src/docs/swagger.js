module.exports = {
  openapi: "3.0.0",
  info: {
    title: "API Voluntariado",
    version: "1.0.0",
    description: "Documentação da API com Swagger",
  },
  servers: [
    {
      url: "http://localhost:3003",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  tags: [
    { name: "Events", description: "Operações relacionadas a eventos" },
    { name: "Auth", description: "Autenticação e login" },
  ],
  paths: {
    "/events": {
      get: {
        tags: ["Events"],
        summary: "Lista todos os eventos",
        responses: {
          200: {
            description: "Lista de eventos retornada com sucesso",
          },
        },
      },
      post: {
        tags: ["Events"],
        summary: "Cria um novo evento (somente admin, precisa de token)",
        security: [{ bearerAuth: [] }], // 👈 exige token JWT
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  date: { type: "string", format: "date" },
                },
                required: ["title", "description", "date"],
              },
            },
          },
        },
        responses: {
          201: { description: "Evento criado com sucesso" },
          400: { description: "Dados inválidos" },
          401: { description: "Não autorizado (token inválido ou ausente)" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Realiza login de usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login bem-sucedido, retorna token JWT",
          },
          401: { description: "Credenciais inválidas" },
        },
      },
    },
  },
};
