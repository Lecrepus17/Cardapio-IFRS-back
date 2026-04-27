const VolunteerModel = require("../models/VolunteerModel");

/**
 * @typedef {import('../models/VolunteerModel').VolunteerPayload} VolunteerPayload
 * @typedef {import('../models/VolunteerModel').Volunteer} Volunteer
 */

/**
 * @class VolunteerService
 * @description Classe de serviço para a lógica de negócio relacionada a voluntários.
 */
class VolunteerService {
  /**
   * @description Service para listar todos os voluntários.
   * @static
   * @async
   * @returns {Promise<Array<Volunteer>>} Uma Promise que resolve para um array com todos os voluntários.
   * @throws {Error} Re-lança erros que possam ocorrer na camada do modelo.
   */
  static async listVolunteers() {
    return await VolunteerModel.getAll();
  }

  /**
   * @description Service para adicionar um novo voluntário, validando os dados.
   * @static
   * @async
   * @param {VolunteerPayload} volunteer - Os dados do voluntário a ser criado.
   * @returns {Promise<Volunteer>} Uma Promise que resolve para o voluntário recém-criado.
   * @throws {Error} Lança um erro se nome, email ou event_id não forem fornecidos.
   */
  static async addVolunteer(volunteer) {
    if (!volunteer.email || !volunteer.name || !volunteer.event_id) {
      throw new Error("Nome, email e ID do evento são obrigatórios.");
    }
    return await VolunteerModel.create(volunteer);
  }

  /**
   * @description Service para alterar um voluntário existente.
   * @static
   * @async
   * @param {Volunteer} volunteer - O objeto do voluntário a ser alterado, incluindo o ID.
   * @returns {Promise<Volunteer>} Uma Promise que resolve para o voluntário com os dados atualizados.
   * @throws {Error} Lança um erro se o ID do voluntário não for fornecido.
   */
  static async alterVolunteer(volunteer) {
    if (!volunteer.id) {
      throw new Error("O ID do voluntário não foi enviado.");
    }
    return await VolunteerModel.alter(volunteer);
  }

  /**
   * @description Service para deletar um voluntário.
   * @static
   * @async
   * @param {object} volunteer - Objeto contendo o ID do voluntário.
   * @param {number} volunteer.id - O ID do voluntário a ser deletado.
   * @returns {Promise<{message: string}>} Uma Promise que resolve para uma mensagem de sucesso.
   * @throws {Error} Lança um erro se o ID do voluntário não for fornecido.
   */
  static async deleteVolunteer(volunteer) {
    if (!volunteer.id) {
      throw new Error("O ID do voluntário não foi enviado.");
    }
    return await VolunteerModel.delete(volunteer);
  }
}

module.exports = VolunteerService;