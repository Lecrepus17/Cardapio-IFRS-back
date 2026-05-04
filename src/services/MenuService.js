const prisma = require('../config/prisma');

/**
 * @class MenuService
 * @description Serviço para gerenciar operações relacionadas a cardápios/menus
 */
class MenuService {
  /**
   * Cria um novo cardápio
   * @async
   * @param {Object} data - Dados do cardápio a ser criado
   * @param {string} data.type - Tipo de refeição (ALMOCO, JANTAR ou CAFEMANHA)
   * @param {string} data.date - Data do cardápio (será convertida para Date)
   * @param {Array<string>} data.items - Lista de itens/pratos do cardápio
   * @returns {Promise<Object>} Cardápio criado com ID e dados
   * @throws {Error} Erro ao criar o cardápio no banco
   */
  async createMenu(data) {
    return await prisma.menu.create({
      data: {
        type: data.type, // Vai receber ALMOCO, JANTAR ou CAFEMANHA
        date: new Date(data.date),
        items: data.items, 
      },
    });
  }

  /**
   * Obtém todos os cardápios da semana atual
   * @async
   * @returns {Promise<Array<Object>>} Array de cardápios da semana ordenados por data
   * @description Retorna os cardápios desde o domingo até o sábado da semana atual
   */
  async getCurrentWeekMenus() {
    const curr = new Date(); 
    const first = curr.getDate() - curr.getDay(); // Domingo
    const last = first + 6; // Sábado

    const firstDay = new Date(curr.setDate(first));
    firstDay.setHours(0, 0, 0, 0);

    const lastDay = new Date(curr.setDate(last));
    lastDay.setHours(23, 59, 59, 999);

    return await prisma.menu.findMany({
      where: {
        date: {
          gte: firstDay,
          lte: lastDay,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  /**
   * Obtém todos os cardápios
   * @async
   * @returns {Promise<Array<Object>>} Array com todos os cardápios ordenados por data
   */
  async getAllMenus() {
    return await prisma.menu.findMany({
      orderBy: { date: 'asc' },
    });
  }

  /**
   * Obtém um cardápio pelo ID
   * @async
   * @param {number|string} id - ID do cardápio a ser encontrado
   * @returns {Promise<Object|null>} Cardápio encontrado ou null se não existir
   */
  async getMenuById(id) {
    return await prisma.menu.findUnique({
      where: { id: parseInt(id) },
    });
  }

  /**
   * Atualiza um cardápio existente
   * @async
   * @param {number|string} id - ID do cardápio a ser atualizado
   * @param {Object} data - Dados a serem atualizados
   * @param {string} [data.type] - Tipo de refeição (ALMOCO, JANTAR ou CAFEMANHA)
   * @param {string} [data.date] - Nova data do cardápio
   * @param {Array<string>} [data.items] - Nova lista de itens
   * @returns {Promise<Object>} Cardápio atualizado
   * @throws {Error} Erro ao atualizar o cardápio
   */
  async updateMenu(id, data) {
    return await prisma.menu.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });
  }

  /**
   * Deleta um cardápio
   * @async
   * @param {number|string} id - ID do cardápio a ser deletado
   * @returns {Promise<Object>} Cardápio deletado
   * @throws {Error} Erro ao deletar o cardápio
   */
  async deleteMenu(id) {
    return await prisma.menu.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = new MenuService();