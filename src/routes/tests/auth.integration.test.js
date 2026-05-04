const request = require("supertest");
const { app } = require("../../app");
const bcrypt = require("bcrypt");

// Mock do serviço atualizado
jest.mock("../../services/userService", () => {
  return {
    findUserByEmail: jest.fn(),
    createUser: jest.fn(),
  };
});

// Mock do bcrypt para facilitar o teste de senha sem gerar um hash real
jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

const userService = require("../../services/userService");

describe("POST /auth/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Cenário de Sucesso
  it("deve retornar um token e 200 para login válido", async () => {
    const mockUser = {
      id: 1,
      email: "admin@ifrs.edu.br",
      password: "hashed_password",
      role: "SERVIDOR", // Atualizado para refletir o novo schema (ALUNO, SERVIDOR ou ADMIN)
    };

    // Simula que o serviço encontrou o usuário
    userService.findUserByEmail.mockResolvedValue(mockUser);
    
    // Simula que o bcrypt comparou as senhas e elas são idênticas
    bcrypt.compare.mockResolvedValue(true);

    const response = await request(app)
      .post("/auth/login")
      .send({ email: "admin@ifrs.edu.br", password: "123456" });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.email).toBe("admin@ifrs.edu.br");
    expect(response.body.user.role).toBe("SERVIDOR");
  });

  // Cenário de Erro (Usuário não encontrado)
  it('deve retornar 401 para credenciais inválidas (e-mail errado)', async () => {
    // Simula que o usuário NÃO foi encontrado no banco (retorna null)
    userService.findUserByEmail.mockResolvedValue(null);

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrong_password' });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Credenciais inválidas.');
  });

  // Cenário de Erro (Senha incorreta)
  it('deve retornar 401 para credenciais inválidas (senha errada)', async () => {
    const mockUser = {
      id: 1,
      email: "admin@ifrs.edu.br",
      password: "hashed_password",
      role: "SERVIDOR",
    };

    // Simula que encontrou o e-mail
    userService.findUserByEmail.mockResolvedValue(mockUser);
    
    // Simula que o bcrypt comparou as senhas e deu FALSO (senha errada)
    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@ifrs.edu.br', password: 'senha_errada_123' });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Credenciais inválidas.');
  });
});