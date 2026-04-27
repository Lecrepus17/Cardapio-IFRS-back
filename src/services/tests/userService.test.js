const UserService = require("../UserService");
const UserModel = require("../../models/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../../models/userModel");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("UserService", () => {
  // Limpa os mocks antes de cada teste para garantir isolamento
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "segredo_teste"; // Define uma ENV fake
  });

  /* -----------------------------------------------------
   * TESTES DE REGISTRO (registerUser)
   * ----------------------------------------------------- */
  describe("registerUser", () => {
    const mockUserPayload = {
      email: "teste@email.com",
      password: "senha123",
      role: "admin",
    };

    it("deve registrar um usuário com sucesso se o email não existir", async () => {
      // ARRANGE
      UserModel.findByEmail.mockResolvedValue(null); // Usuário não existe
      bcrypt.hash.mockResolvedValue("senha_criptografada"); // Simula o hash
      UserModel.create.mockResolvedValue(10); // Simula retorno do ID 10

      // ACT
      const result = await UserService.registerUser({ ...mockUserPayload });

      // ASSERT
      expect(UserModel.findByEmail).toHaveBeenCalledWith(mockUserPayload.email);
      expect(bcrypt.hash).toHaveBeenCalledWith("senha123", 10);

      // Verifica se create foi chamado com a senha JÁ criptografada
      expect(UserModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "teste@email.com",
          password: "senha_criptografada",
        })
      );

      expect(result).toEqual({
        message: "Usuário registrado com sucesso",
        id: 10,
      });
    });

    it("deve lançar erro se o usuário já existe", async () => {
      // ARRANGE
      UserModel.findByEmail.mockResolvedValue({
        id: 1,
        email: "teste@email.com",
      });

      // ACT & ASSERT
      await expect(UserService.registerUser(mockUserPayload)).rejects.toThrow(
        "Usuário já existe"
      );

      // Garante que não tentou criar nada no banco
      expect(UserModel.create).not.toHaveBeenCalled();
    });
  });

  /* -----------------------------------------------------
   * TESTES DE LOGIN (loginUser)
   * ----------------------------------------------------- */
  describe("loginUser", () => {
    const loginCredentials = {
      email: "teste@email.com",
      password: "senha123",
    };

    const mockDbUser = {
      id: 1,
      email: "teste@email.com",
      password: "hash_do_banco",
      role: "user",
    };

    it("deve retornar token e usuário se as credenciais forem válidas", async () => {
      // ARRANGE
      UserModel.findByEmail.mockResolvedValue(mockDbUser); // Encontrou usuário
      bcrypt.compare.mockResolvedValue(true); // Senha bateu
      jwt.sign.mockReturnValue("token_jwt_falso"); // Gerou token

      // ACT
      const result = await UserService.loginUser(loginCredentials);

      // ASSERT
      expect(UserModel.findByEmail).toHaveBeenCalledWith(
        loginCredentials.email
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginCredentials.password,
        mockDbUser.password
      );

      expect(jwt.sign).toHaveBeenCalledWith(
        { email: mockDbUser.email, role: mockDbUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      expect(result).toEqual({
        token: "token_jwt_falso",
        user: { email: mockDbUser.email, role: mockDbUser.role },
      });
    });

    it("deve lançar erro se o usuário não for encontrado", async () => {
      // ARRANGE
      UserModel.findByEmail.mockResolvedValue(null); // Não achou ninguém

      // ACT & ASSERT
      await expect(UserService.loginUser(loginCredentials)).rejects.toThrow(
        "Usuário não encontrado"
      );

      // Não deve nem tentar checar senha se usuário não existe
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it("deve lançar erro se a senha for inválida", async () => {
      // ARRANGE
      UserModel.findByEmail.mockResolvedValue(mockDbUser);
      bcrypt.compare.mockResolvedValue(false); // Senha errada

      // ACT & ASSERT
      await expect(UserService.loginUser(loginCredentials)).rejects.toThrow(
        "Senha inválida"
      );

      // Não deve gerar token
      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });
});
