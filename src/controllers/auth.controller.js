const UserService = require("../services/UserService");

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * @class AuthController
 * @description Controller responsável por gerenciar as requisições de autenticação.
 */
class AuthController {
  /**
   * @description Registra um novo usuário na aplicação.
   * @route POST /register
   * @static
   * @async
   * @param {Request} req - O objeto de requisição do Express. Espera-se que `req.body` contenha os dados do usuário (email, password, role).
   * @param {Response} res - O objeto de resposta do Express.
   * @returns {Promise<Response>} Retorna uma resposta JSON com a mensagem de sucesso e o ID do usuário (status 201) ou uma mensagem de erro (status 409).
   */
  static async register(req, res) {
    try {
      // Chama o serviço para registrar o usuário, passando os dados da requisição
      const result = await UserService.registerUser(req.body);
      // Retorna status 201 (Criado) com os dados retornados pelo serviço
      return res.status(201).json(result);
    } catch (error) {
      // Em caso de erro (ex: usuário já existe), retorna status 409 (Conflito) com a mensagem do erro
      return res.status(409).json({ message: error.message });
    }
  }

  /**
   * @description Autentica um usuário e retorna um token JWT.
   * @route POST /login
   * @static
   * @async
   * @param {Request} req - O objeto de requisição do Express. Espera-se que `req.body` contenha as credenciais (email, password).
   * @param {Response} res - O objeto de resposta do Express.
   * @returns {Promise<Response>} Retorna uma resposta JSON com o token e dados do usuário (status 200) ou uma mensagem de erro (status 401 ou 500).
   */
  static async login(req, res) {
    try {
      // Chama o serviço para autenticar o usuário, passando os dados da requisição
      const result = await UserService.loginUser(req.body);
      // Retorna status 200 (OK) com o token JWT
      return res.status(200).json(result); // envia { token, user }
    } catch (error) {
      
      // Define o status apropriado com base na mensagem de erro
      const status =
        error.message === "Usuário não encontrado" ||
        error.message === "Senha inválida"
          ? 401 // Não autorizado
          : 401; // Erro interno do servidor
      // Retorna o status definido com a mensagem do erro
      return res.status(status).json({ message: error.message });
    }
  }
}

module.exports = AuthController;