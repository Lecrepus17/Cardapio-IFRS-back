const prisma = require("../config/prisma"); // Importa a instância configurada do Prisma

/**
 * @typedef {object} VolunteerPayload
 * @property {string} name - O nome do voluntário.
 * @property {string} email - O email do voluntário.
 * @property {number} event_id - O ID do evento ao qual o voluntário está associado.
 */

/**
 * @typedef {VolunteerPayload} Volunteer
 * @property {number} id - O ID único do voluntário.
 */

/**
 * @class VolunteerModel
 * @description Classe para gerenciar as operações de banco de dados (CRUD) para voluntários usando Prisma.
 */
class VolunteerModel {
  /**
   * @description Busca todos os voluntários no banco de dados.
   * @static
   * @async
   * @returns {Promise<Array<Volunteer>>} Uma Promise que resolve para um array de objetos de voluntário.
   * @throws {Error} Lança um erro se a consulta ao banco de dados falhar.
   */
  static async getAll() {
    return await prisma.volunteer.findMany();
  }

  /**
   * @description Cria um novo voluntário no banco de dados.
   * @static
   * @async
   * @param {VolunteerPayload} volunteer - O objeto com os dados do voluntário a ser criado.
   * @returns {Promise<Volunteer>} Uma Promise que resolve para o objeto do voluntário recém-criado.
   * @throws {Error} Lança um erro se a inserção no banco de dados falhar.
   */
  static async create(volunteer) {
    const { name, email, event_id } = volunteer;

    const createdVolunteer = await prisma.volunteer.create({
      data: {
        name,
        email,
        eventId: Number(event_id), // Garante que seja um número (Int)
      },
    });

    return createdVolunteer;
  }

  /**
   * @description Altera um voluntário existente com base no seu ID.
   * @static
   * @async
   * @param {Volunteer} volunteer - O objeto do voluntário a ser alterado, incluindo o ID.
   * @returns {Promise<Volunteer>} Uma Promise que resolve para o objeto do voluntário com os dados atualizados.
   * @throws {Error} Lança um erro se o voluntário com o ID especificado não for encontrado.
   */
  static async alter(volunteer) {
    const { id, name, email, event_id } = volunteer;

    try {
      const updatedVolunteer = await prisma.volunteer.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
          eventId: Number(event_id),
        },
      });

      return updatedVolunteer;
    } catch (error) {
      // P2025: Record to update not found
      if (error.code === 'P2025') {
        throw new Error(`Voluntário com id ${id} não encontrado.`);
      }
      throw error;
    }
  }

  /**
   * @description Deleta um voluntário do banco de dados com base no seu ID.
   * @static
   * @async
   * @param {object} volunteer - O objeto contendo o ID do voluntário.
   * @param {number} volunteer.id - O ID do voluntário a ser deletado.
   * @returns {Promise<{message: string}>} Uma Promise que resolve para um objeto com uma mensagem de sucesso.
   * @throws {Error} Lança um erro se o voluntário com o ID especificado não for encontrado.
   */
  static async delete(volunteer) {
    const { id } = volunteer;

    try {
      await prisma.volunteer.delete({
        where: { id: Number(id) },
      });

      return { message: `Voluntário com id ${id} deletado com sucesso.` };
    } catch (error) {
      // P2025: Record to delete not found
      if (error.code === 'P2025') {
        throw new Error(`Voluntário com id ${id} não encontrado.`);
      }
      throw error;
    }
  }
}

module.exports = VolunteerModel;