const userModel = require('../models/userModel'); // Importa o Model em vez do Prisma
const bcrypt = require('bcryptjs');

/**
 * @class UserService
 * @description Serviço para gerenciar operações relacionadas a usuários
 */
class UserService {
  /**
   * Cria um novo usuário com senha hashada
   * @async
   * @param {Object} data - Dados do usuário a ser criado
   * @param {string} data.email - Email do usuário
   * @param {string} data.password - Senha do usuário (será hashada)
   * @param {string} [data.role='ALUNO'] - Papel/role do usuário (ALUNO, SERVIDOR, ADMIN)
   * @returns {Promise<Object>} Usuário criado com ID e dados
   * @throws {Error} Erro ao hashear a senha ou criar o usuário no banco
   */
  async createUser(data) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Repassa os dados para o Model criar no banco
    return await userModel.create({
      email: data.email,
      password: hashedPassword,
      role: data.role || 'ALUNO',
    });
  }

  /**
   * Encontra um usuário pelo email
   * @async
   * @param {string} email - Email do usuário a ser encontrado
   * @returns {Promise<Object|null>} Usuário encontrado ou null se não existir
   */
  async findUserByEmail(email) {
    return await userModel.findByEmail(email);
  }

  /**
   * Obtém um usuário pelo ID
   * @async
   * @param {number} id - ID do usuário
   * @returns {Promise<Object|null>} Usuário encontrado ou null se não existir
   */
  async getUserById(id) {
    return await userModel.findById(id);
  }
}

module.exports = new UserService();