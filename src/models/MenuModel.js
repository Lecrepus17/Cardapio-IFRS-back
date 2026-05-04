const prisma = require('../config/prisma');

/**
 * @class MenuModel
 * @description Modelo de dados para operações de cardápios no banco de dados
 */
class MenuModel {
  /**
   * Cria um novo cardápio no banco de dados
   * @async
   * @param {Object} data - Dados do cardápio a ser criado
   * @param {string} data.type - Tipo de refeição (ALMOCO, JANTAR, CAFEMANHA)
   * @param {Date} data.date - Data do cardápio
   * @param {Array<string>} data.items - Lista de itens/pratos do cardápio
   * @returns {Promise<Object>} Cardápio criado com ID
   * @throws {Error} Erro ao criar o cardápio no banco de dados
   */
  async create(data) {
    return await prisma.menu.create({ data });
  }

  /**
   * Encontra cardápios dentro de um intervalo de datas
   * @async
   * @param {Date} startDate - Data de início do intervalo (incluída)
   * @param {Date} endDate - Data de fim do intervalo (incluída)
   * @returns {Promise<Array<Object>>} Array de cardápios encontrados ordenados por data
   * @throws {Error} Erro ao consultar o banco de dados
   */
  async findByDateRange(startDate, endDate) {
    return await prisma.menu.findMany({
      where: {
        date: {
          gte: startDate, // Maior ou igual
          lte: endDate,   // Menor ou igual
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  /**
   * Encontra todos os cardápios
   * @async
   * @returns {Promise<Array<Object>>} Array com todos os cardápios ordenados por data
   * @throws {Error} Erro ao consultar o banco de dados
   */
  async findAll() {
    return await prisma.menu.findMany({
      orderBy: { date: 'asc' },
    });
  }

  /**
   * Encontra um cardápio pelo ID
   * @async
   * @param {number|string} id - ID do cardápio a ser encontrado
   * @returns {Promise<Object|null>} Cardápio encontrado ou null se não existir
   * @throws {Error} Erro ao consultar o banco de dados
   */
  async findById(id) {
    return await prisma.menu.findUnique({
      where: { id: parseInt(id) },
    });
  }

  /**
   * Atualiza um cardápio existente
   * @async
   * @param {number|string} id - ID do cardápio a ser atualizado
   * @param {Object} data - Dados a serem atualizados
   * @param {string} [data.type] - Novo tipo de refeição
   * @param {Date} [data.date] - Nova data
   * @param {Array<string>} [data.items] - Nova lista de itens
   * @returns {Promise<Object>} Cardápio atualizado
   * @throws {Error} Erro ao atualizar o cardápio
   */
  async update(id, data) {
    return await prisma.menu.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  /**
   * Deleta um cardápio
   * @async
   * @param {number|string} id - ID do cardápio a ser deletado
   * @returns {Promise<Object>} Cardápio deletado
   * @throws {Error} Erro ao deletar o cardápio
   */
  async delete(id) {
    return await prisma.menu.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = new MenuModel();