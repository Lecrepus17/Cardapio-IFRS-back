const request = require("supertest");
const { app } = require("../../app");

jest.mock("../../services/UserService", () => {
  return {
    loginUser: jest.fn(),
    registerUser: jest.fn(), // É bom mockar outros métodos se existirem
  };
});

// Importamos depois do mock
const UserService = require("../../services/UserService");

describe("POST /api/auth/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Cenário de Sucesso
  it("deve retornar um token e 200 para login válido", async () => {
    const mockUser = {
      email: "admin@ifrs.edu.br",
      password: "hashed_password",
      role: "VOLUNTEER",
    };

    UserService.loginUser.mockResolvedValue({
      user: mockUser,
      token: "fake-jwt-token",
    });

    const response = await request(app)
      .post("/auth/login")
      .send({ email: "admin@ifrs.edu.br", password: "123456" });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.email).toBe("admin@ifrs.edu.br");
  });

  // Cenário de Erro
  it('deve retornar 401 para credenciais inválidas', async () => {
    // Agora o mockRejectedValue também vai funcionar
    UserService.loginUser.mockRejectedValue(new Error('Credenciais inválidas'));

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrong_password' });

    expect(response.statusCode).toBe(401);
    // Verifique se a mensagem bate com o que seu controller retorna
    expect(response.body).toHaveProperty('message', 'Credenciais inválidas');
  });
});
