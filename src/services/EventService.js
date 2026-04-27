const EventModel = require("../models/eventModel");

/**
 * @typedef {import('../models/eventModel').EventPayload} EventPayload
 * @typedef {import('../models/eventModel').Event} Event
 */

/**
 * @class EventService
 * @description Classe de serviço para gerenciar a lógica de negócio relacionada a eventos.
 */
class EventService {
  /**
   * @description Service para listar todos os eventos.
   * @static
   * @async
   * @returns {Promise<Array<Event>>} Uma Promise que resolve para um array com todos os eventos.
   * @throws {Error} Re-lança erros que possam ocorrer na camada do modelo.
   */
  static async listEvents() {
    return await EventModel.getAll();
  }

  /**
   * @description Service para adicionar um novo evento, validando os dados de entrada.
   * @static
   * @async
   * @param {EventPayload} event - Os dados do evento a ser criado.
   * @returns {Promise<Event>} Uma Promise que resolve para o evento recém-criado.
   * @throws {Error} Lança um erro se o título ou a data não forem fornecidos.
   */
  static async addEvent(event) {
    if (!event.title || !event.date) {
      throw new Error("Título e data são obrigatórios.");
    }
    return await EventModel.create(event);
  }

  /**
   * @description Service para alterar um evento existente.
   * @static
   * @async
   * @param {Event} event - O objeto do evento a ser alterado, incluindo seu ID.
   * @returns {Promise<Event>} Uma Promise que resolve para o evento atualizado.
   * @throws {Error} Lança um erro se o ID do evento não for fornecido.
   */
  static async alterEvent(event) {
    if (!event.id) {
      throw new Error("O ID do evento não foi enviado.");
    }
    return await EventModel.alter(event);
  }

  /**
   * @description Service para deletar um evento.
   * @static
   * @async
   * @param {object} event - Objeto contendo o ID do evento a ser deletado.
   * @param {number} event.id - O ID do evento.
   * @returns {Promise<{message: string}>} Uma Promise que resolve para um objeto com uma mensagem de sucesso.
   * @throws {Error} Lança um erro se o ID do evento não for fornecido.
   */
  static async deleteEvent(event) {
    if (!event.id) {
      throw new Error("O ID do evento não foi enviado.");
    }
    return await EventModel.delete(event);
  }
}

module.exports = EventService;