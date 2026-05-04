const { Router } = require('express');
const authController = require('../controllers/auth.controller');

const router = Router();

/**
 * @fileoverview Rotas de autenticação
 * @description Rotas para registro e login de usuários
 */

/**
 * @route POST /register
 * @description Registra um novo usuário no sistema
 * @access Public
 * @param {Object} body - Dados do usuário a registrar
 * @param {string} body.email - Email do usuário
 * @param {string} body.password - Senha do usuário
 * @param {string} [body.role] - Role/papel do usuário (padrão: ALUNO)
 * @returns {Object} Usuário registrado com token JWT
 */
router.post('/register', authController.register);

/**
 * @route POST /login
 * @description Autentica um usuário e retorna um token JWT
 * @access Public
 * @param {Object} body - Credenciais do usuário
 * @param {string} body.email - Email do usuário
 * @param {string} body.password - Senha do usuário
 * @returns {Object} Token JWT para autenticação nas demais rotas
 */
router.post('/login', authController.login);

module.exports = router;