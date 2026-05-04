const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @class AuthController
 * @description Controller para gerenciar operações de autenticação
 */
class AuthController {
  /**
   * Registra um novo usuário no sistema
   * @async
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} req.body - Dados do usuário a ser registrado
   * @param {string} req.body.email - Email do usuário
   * @param {string} req.body.password - Senha do usuário
   * @param {string} [req.body.role] - Role/papel do usuário (padrão: ALUNO)
   * @param {Object} res - Objeto de resposta Express
   * @param {Function} next - Função para passar controle ao próximo middleware
   * @returns {void}
   * @description Verifica se o email já está registrado antes de criar o usuário
   */
  async register(req, res, next) {
    try {
      const { email, password, role } = req.body;
      
      // Verifica se o usuário já existe
      const userExists = await userService.findUserByEmail(email);
      if (userExists) {
        return res.status(400).json({ message: 'E-mail já cadastrado.' });
      }

      const user = await userService.createUser({ email, password, role });
      
      // Retorna o usuário criado (sem a senha, por segurança)
      res.status(201).json({ id: user.id, email: user.email, role: user.role });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Autentica um usuário e retorna um token JWT
   * @async
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} req.body - Credenciais do usuário
   * @param {string} req.body.email - Email do usuário
   * @param {string} req.body.password - Senha do usuário
   * @param {Object} res - Objeto de resposta Express
   * @param {Function} next - Função para passar controle ao próximo middleware
   * @returns {void}
   * @description Valida as credenciais do usuário e retorna um token JWT válido por 1 dia
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await userService.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      // Gera o Token JWT
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'sua_chave_secreta_aqui',
        { expiresIn: '1d' }
      );

      res.status(200).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role // ALUNO ou SERVIDOR
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();