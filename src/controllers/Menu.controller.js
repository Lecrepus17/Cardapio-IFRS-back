const menuService = require('../services/MenuService');

/**
 * @class MenuController
 * @description Controller para gerenciar operações relacionadas a cardápios/menus
 */
class MenuController {
  /**
   * Cria um novo cardápio
   * @async
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} req.body - Dados do cardápio a ser criado
   * @param {string} req.body.type - Tipo de refeição (ALMOCO, JANTAR, CAFEMANHA)
   * @param {string} req.body.date - Data do cardápio
   * @param {Array<string>} req.body.items - Lista de itens do cardápio
   * @param {Object} res - Objeto de resposta Express
   * @param {Function} next - Função para passar controle ao próximo middleware (tratamento de erros)
   * @returns {void}
   */
  async create(req, res, next) {
    try {
      const menu = await menuService.createMenu(req.body);
      res.status(201).json(menu);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtém os cardápios da semana atual
   * @async
   * @description Rota principal pedida no trabalho: Cardápios da semana atual
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   * @param {Function} next - Função para passar controle ao próximo middleware
   * @returns {void}
   */
  async getCurrentWeek(req, res, next) {
    try {
      const menus = await menuService.getCurrentWeekMenus();
      res.status(200).json(menus);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtém todos os cardápios
   * @async
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   * @param {Function} next - Função para passar controle ao próximo middleware
   * @returns {void}
   */
  async getAll(req, res, next) {
    try {
      const menus = await menuService.getAllMenus();
      res.status(200).json(menus);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtém um cardápio específico pelo ID
   * @async
   * @param {Object} req - Objeto de requisição Express
   * @param {string} req.params.id - ID do cardápio
   * @param {Object} res - Objeto de resposta Express
   * @param {Function} next - Função para passar controle ao próximo middleware
   * @returns {void}
   */
  async getById(req, res, next) {
    try {
      const menu = await menuService.getMenuById(req.params.id);
      if (!menu) {
        return res.status(404).json({ message: 'Cardápio não encontrado' });
      }
      res.status(200).json(menu);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Atualiza um cardápio existente
   * @async
   * @param {Object} req - Objeto de requisição Express
   * @param {string} req.params.id - ID do cardápio a ser atualizado
   * @param {Object} req.body - Dados a serem atualizados
   * @param {Object} res - Objeto de resposta Express
   * @param {Function} next - Função para passar controle ao próximo middleware
   * @returns {void}
   */
  async update(req, res, next) {
    try {
      const menu = await menuService.updateMenu(req.params.id, req.body);
      res.status(200).json(menu);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deleta um cardápio
   * @async
   * @param {Object} req - Objeto de requisição Express
   * @param {string} req.params.id - ID do cardápio a ser deletado
   * @param {Object} res - Objeto de resposta Express
   * @param {Function} next - Função para passar controle ao próximo middleware
   * @returns {void}
   */
  async delete(req, res, next) {
    try {
      await menuService.deleteMenu(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MenuController();