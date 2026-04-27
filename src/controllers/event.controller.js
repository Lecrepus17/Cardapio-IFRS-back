const EventService = require("../services/EventService");

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * @class EventController
 * @description Lida com as requisições HTTP para as rotas de eventos.
 */
class EventController {
  /**
   * @description Busca e lista todos os eventos.
   * @route GET /events
   * @static
   * @async
   * @param {Request} req - O objeto de requisição do Express.
   * @param {Response} res - O objeto de resposta do Express.
   * @returns {Promise<Response>} Retorna uma resposta JSON com a lista de eventos (status 200) ou um erro (status 500).
   */
  static async getEvents(req, res) {
    try {
      const events = await EventService.listEvents();
      res.json(events);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * @description Cria um novo evento.
   * @route POST /events
   * @static
   * @async
   * @param {Request} req - O objeto de requisição do Express, com os dados do evento em `req.body`.
   * @param {Response} res - O objeto de resposta do Express.
   * @returns {Promise<Response>} Retorna o novo evento em JSON (status 201) ou um erro de validação (status 400).
   */
  static async createEvent(req, res) {
    try {
      const newEvent = await EventService.addEvent(req.body);
      res.status(201).json(newEvent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  /**
   * @description Atualiza um evento existente.
   * @route PUT /events
   * @static
   * @async
   * @param {Request} req - O objeto de requisição do Express, com os dados do evento (incluindo o ID) em `req.body`.
   * @param {Response} res - O objeto de resposta do Express.
   * @returns {Promise<Response>} Retorna o evento atualizado em JSON (status 201) ou um erro (status 400).
   */
  static async updateEvent(req, res) {
    try {
      const event = await EventService.alterEvent(req.body);
      res.status(201).json(event);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  /**
   * @description Deleta um evento.
   * @route DELETE /events
   * @static
   * @async
   * @param {Request} req - O objeto de requisição do Express, com o ID do evento em `req.body`.
   * @param {Response} res - O objeto de resposta do Express.
   * @returns {Promise<Response>} Retorna uma mensagem de sucesso em JSON (status 201) ou um erro (status 400).
   */
  static async deleteEvent(req, res) {
    try {
      const event = await EventService.deleteEvent(req.body);
      res.status(201).json(event);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = EventController;