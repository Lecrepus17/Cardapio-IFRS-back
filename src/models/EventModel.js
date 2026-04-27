const prisma = require("../config/prisma"); // Importa a instância configurada do Prisma

/**
 * @typedef {object} EventPayload
 * @property {string} title - O título do evento.
 * @property {string} description - A descrição detalhada do evento.
 * @property {string | Date} date - A data do evento.
 */

/**
 * @typedef {EventPayload} Event
 * @property {number} id - O ID único do evento.
 */

/**
 * @class EventModel
 * @description Classe responsável pelas operações de banco de dados (CRUD) para eventos usando Prisma.
 */
class EventModel {
  /**
   * @description Busca todos os eventos no banco de dados.
   * @static
   * @async
   * @returns {Promise<Array<Event>>} Uma Promise que resolve para um array de objetos de evento.
   */
  static async getAll() {
    // Prisma: findMany substitui SELECT *
    return await prisma.event.findMany();
  }

  /**
   * @description Cria um novo evento no banco de dados.
   * @static
   * @async
   * @param {EventPayload} event - O objeto contendo os dados do evento a ser criado.
   * @returns {Promise<Event>} Uma Promise que resolve para o objeto do evento recém-criado.
   */
  static async create(event) {
    const { title, description, date } = event;

    // Prisma: create substitui INSERT
    // Nota: O Prisma converte automaticamente strings ISO para DateTime,
    // mas é boa prática garantir que seja um objeto Date se necessário.
    const createdEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date), // Garante formato DateTime
      },
    });

    return createdEvent;
  }

  /**
   * @description Altera um evento existente no banco de dados com base no ID.
   * @static
   * @async
   * @param {Event} event - O objeto do evento a ser alterado, incluindo o ID.
   * @returns {Promise<Event>} Uma Promise que resolve para o objeto do evento com os dados atualizados.
   * @throws {Error} Lança um erro se o evento com o ID especificado não for encontrado.
   */
  static async alter(event) {
    const { id, title, description, date } = event;

    try {
      // Prisma: update substitui UPDATE ... WHERE
      const updatedEvent = await prisma.event.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          date: new Date(date),
        },
      });

      return updatedEvent;
    } catch (error) {
      // O código de erro P2025 no Prisma significa "Record not found"
      if (error.code === "P2025") {
        throw new Error(`Evento com id ${id} não encontrado.`);
      }
      throw error;
    }
  }

  /**
   * @description Deleta um evento do banco de dados com base no ID.
   * @static
   * @async
   * @param {object} event - O objeto contendo o ID do evento a ser deletado.
   * @param {number} event.id - O ID do evento.
   * @returns {Promise<{message: string}>} Uma Promise que resolve para um objeto com uma mensagem de sucesso.
   * @throws {Error} Lança um erro se o evento com o ID especificado não for encontrado.
   */
  static async delete(event) {
    const { id } = event;

    try {
      // Prisma: delete substitui DELETE ... WHERE
      await prisma.event.delete({
        where: { id: Number(id) },
      });

      return { message: `Evento com id ${id} deletado com sucesso.` };
    } catch (error) {
      // Tratamento de erro idêntico ao update para manter consistência
      if (error.code === "P2025") {
        throw new Error(`Evento com id ${id} não encontrado.`);
      }
      throw error;
    }
  }
}

module.exports = EventModel;
