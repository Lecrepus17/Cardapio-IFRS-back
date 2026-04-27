const VolunteerService = require("../services/VolunteerService");

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * Representa uma requisição Express autenticada que estende o objeto Request padrão.
 * @typedef {object} AuthenticatedRequest
 * @extends Request
 * @property {object} [user] - O payload do usuário decodificado do token JWT.
 * @property {string} [user.email] - O email do usuário.
 * @property {string} [user.role] - A permissão do usuário.
 */

/**
 * @class VolunteersController
 * @description Controller para lidar com as requisições das rotas de voluntários, incluindo rotas protegidas.
 */
class VolunteersController {
  /**
   * @description Acessa o painel do usuário autenticado.
   * @route GET /volunteers/dashboard
   * @static
   * @param {AuthenticatedRequest} req - O objeto de requisição do Express, contendo `req.user` do token JWT.
   * @param {Response} res - O objeto de resposta do Express.
   * @returns {Response} Retorna uma mensagem de boas-vindas (status 200) ou um erro (status 500).
   */
  static dashboard(req, res) {
    try {
      return res.status(200).json({
        message: `Bem-vindo ao painel, ${req.user.email}`,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao acessar o painel", error: error.message });
    }
  }

  /**
   * @description Acessa uma área restrita para administradores.
   * @route GET /volunteers/admin
   * @static
   * @param {AuthenticatedRequest} req - O objeto de requisição do Express, contendo `req.user` do token JWT.
   * @param {Response} res - O objeto de resposta do Express.
   * @returns {Response} Retorna uma mensagem de boas-vindas (status 200) ou um erro (status 500).
   */
  static adminOnly(req, res) {
    try {
      return res.status(200).json({
        message: `Bem-vindo à área admin, ${req.user.email}`,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao acessar a área admin",
        error: error.message,
      });
    }
  }

  /**
   * @description Cria um novo voluntário.
   * @route POST /volunteers
   * @static
   * @async
   * @param {Request} req - O objeto de requisição do Express, com os dados do voluntário em `req.body`.
   * @param {Response} res - O objeto de resposta do Express.
   * @returns {Promise<Response>} Retorna o novo voluntário em JSON (status 201) ou um erro (status 409).
   */
  static async newVolunteer(req, res) {
    try {
      const result = await VolunteerService.addVolunteer(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  }

  /**
   * @description Busca e lista todos os voluntários.
   * @route GET /volunteers
   * @static
   * @async
   * @param {Request} req - O objeto de requisição do Express.
   * @param {Response} res - O objeto de resposta do Express.
   * @returns {Promise<Response>} Retorna uma resposta JSON com a lista de voluntários (status 200) ou um erro (status 500).
   */
  static async getVolunteers(req, res) {
    try {
      const volunteers = await VolunteerService.listVolunteers();
      res.json(volunteers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * @description Atualiza um voluntário existente.
   * @route PUT /volunteers
   * @static
   * @async
   * @param {Request} req - O objeto de requisição do Express, com os dados do voluntário (incluindo o ID) em `req.body`.
   * @param {Response} res - O objeto de resposta do Express.
   * @returns {Promise<Response>} Retorna o voluntário atualizado em JSON (status 201) ou um erro (status 400).
   */
  static async updateVolunteer(req, res) {
    try {
      const volunteer = await VolunteerService.alterVolunteer(req.body);
      res.status(201).json(volunteer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  /**
   * @description Deleta um voluntário.
   * @route DELETE /volunteers
   * @static
   * @async
   * @param {Request} req - O objeto de requisição do Express, com o ID do voluntário em `req.body`.
   * @param {Response} res - O objeto de resposta do Express.
   * @returns {Promise<Response>} Retorna uma mensagem de sucesso em JSON (status 201) ou um erro (status 400).
   */
  static async deleteVolunteer(req, res) {
    try {
      const volunteer = await VolunteerService.deleteVolunteer(req.body);
      res.status(201).json(volunteer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = VolunteersController;