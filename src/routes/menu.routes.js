const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const MenuController = require('../controllers/Menu.controller');

const router = Router();

/**
 * @fileoverview Rotas para gerenciar cardápios/menus
 * @description Todas as rotas de cardápio exigem autenticação do usuário
 */

// Todas as rotas de cardápio exigem que o usuário esteja logado
router.use(authMiddleware);

/**
 * @route GET /current-week
 * @description Obtém todos os cardápios da semana atual
 * @access Private (Requer autenticação)
 * @returns {Array<Object>} Array de cardápios da semana
 */
router.get('/current-week', MenuController.getCurrentWeek);

/**
 * @route POST /
 * @description Cria um novo cardápio
 * @access Private (Requer autenticação - Idealmente ADMIN ou SERVIDOR)
 * @param {Object} body - Dados do cardápio
 * @param {string} body.type - Tipo de refeição (ALMOCO, JANTAR, CAFEMANHA)
 * @param {string} body.date - Data do cardápio
 * @param {Array<string>} body.items - Lista de itens do cardápio
 * @returns {Object} Cardápio criado
 */
router.post('/', MenuController.create);

/**
 * @route GET /
 * @description Obtém todos os cardápios
 * @access Private (Requer autenticação)
 * @returns {Array<Object>} Array com todos os cardápios
 */
router.get('/', MenuController.getAll);

/**
 * @route GET /:id
 * @description Obtém um cardápio específico pelo ID
 * @access Private (Requer autenticação)
 * @param {number} id - ID do cardápio
 * @returns {Object} Cardápio encontrado
 */
router.get('/:id', MenuController.getById);

/**
 * @route PUT /:id
 * @description Atualiza um cardápio existente
 * @access Private (Requer autenticação - Idealmente ADMIN ou SERVIDOR)
 * @param {number} id - ID do cardápio
 * @param {Object} body - Dados a serem atualizados
 * @returns {Object} Cardápio atualizado
 */
router.put('/:id', MenuController.update);

/**
 * @route DELETE /:id
 * @description Deleta um cardápio
 * @access Private (Requer autenticação - Idealmente ADMIN ou SERVIDOR)
 * @param {number} id - ID do cardápio
 * @returns {Object} Cardápio deletado
 */
router.delete('/:id', MenuController.delete);

module.exports = router;