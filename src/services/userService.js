const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

/**
 * @typedef {import('../models/userModel').UserPayload} UserPayload
 */

/**
 * @typedef {object} LoginPayload
 * @property {string} email - O email para login.
 * @property {string} password - A senha para login.
 */

/**
 * @class UserService
 * @description Classe de serviço contendo a lógica de negócio para registro e autenticação de usuários.
 */
class UserService {
  /**
   * @description Service para registrar um novo usuário.
   * Verifica se o usuário já existe e criptografa a senha antes de salvar.
   * @static
   * @async
   * @param {UserPayload} user - Os dados do usuário a serem registrados.
   * @returns {Promise<{message: string, id: number}>} Uma Promise que resolve para um objeto com a mensagem de sucesso e o ID do novo usuário.
   * @throws {Error} Lança um erro se o email fornecido já estiver em uso.
   */
  static async registerUser(user) {
    const { email, password, role } = user;
    // Verifica se o e-mail já está cadastrado
    const existing = await UserModel.findByEmail(email);
    if (existing) {
      throw new Error("Usuário já existe");
    }
    // Criptografa a senha antes de salvar no banco
    const hashed = await bcrypt.hash(password, 10);
    // Substitui a senha original pela criptografada
    user.password = hashed;
    // Cria o novo usuário e retorna seu ID
    const id = await UserModel.create(user);
    // Retorna os dados de sucesso (sem lançar erro)
    return { message: "Usuário registrado com sucesso", id };
  }

  /**
   * @description Service para autenticar um usuário e gerar um token JWT.
   * @static
   * @async
   * @param {LoginPayload} credentials - As credenciais de login do usuário.
   * @returns {Promise<{token: string, user: {email: string, role: string}}>} Uma Promise que resolve para um objeto contendo o token JWT e informações básicas do usuário.
   * @throws {Error} Lança um erro se o usuário não for encontrado ou se a senha for inválida.
   */
  static async loginUser({ email, password }) {
    // Busca o usuário pelo e-mail
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    // Verifica se a senha fornecida é válida
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Senha inválida");
    }
    // Gera o token JWT
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Retorna o token e o usuário para o controller
    return { token, user: { email: user.email, role: user.role } };
  }
}
module.exports = UserService;