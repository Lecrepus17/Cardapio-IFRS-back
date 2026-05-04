module.exports = {
  openapi: "3.0.0",
  info: {
    title: "API Cardápio IFRS",
    version: "1.0.0",
    description: "Documentação da API do Refeitório com Swagger",
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
    { name: "Menus", description: "Operações relacionadas aos cardápios do refeitório" },
    { name: "Auth", description: "Autenticação e registro de usuários" },
  ],
  paths: {
    "/menus/current-week": {
      get: {
        tags: ["Menus"],
        summary: "Lista os cardápios da semana atual",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lista de cardápios da semana retornada com sucesso",
          },
          401: { description: "Não autorizado (token inválido ou ausente)" },
        },
      },
    },
    "/menus": {
      get: {
        tags: ["Menus"],
        summary: "Lista todos os cardápios cadastrados",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lista de cardápios retornada com sucesso",
          },
          401: { description: "Não autorizado (token inválido ou ausente)" },
        },
      },
      post: {
        tags: ["Menus"],
        summary: "Cria um novo cardápio (exige token)",
        security: [{ bearerAuth: [] }], 
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  type: { 
                    type: "string", 
                    enum: ["CAFEMANHA", "ALMOCO", "JANTAR"],
                    description: "Tipo da refeição"
                  },
                  date: { 
                    type: "string", 
                    format: "date",
                    description: "Data do cardápio (YYYY-MM-DD)"
                  },
                  items: { 
                    type: "array",
                    items: {
                      type: "string"
                    },
                    example: ["Arroz", "Feijão", "Frango Assado", "Salada"],
                    description: "Vetor com os itens servidos"
                  },
                },
                required: ["type", "date", "items"],
              },
            },
          },
        },
        responses: {
          201: { description: "Cardápio criado com sucesso" },
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
            description: "Login bem-sucedido, retorna token JWT e dados do usuário",
          },
          401: { description: "Credenciais inválidas" },
        },
      },
    },
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Registra um novo usuário (Aluno ou Servidor)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                  role: {
                    type: "string",
                    enum: ["ALUNO", "SERVIDOR", "ADMIN"]
                  }
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          201: { description: "Usuário registrado com sucesso" },
          400: { description: "E-mail já cadastrado" },
        },
      },
    },
  },
};