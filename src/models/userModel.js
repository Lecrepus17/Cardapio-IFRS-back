const prisma = require('../config/prisma');

/**
 * @class UserModel
 * @description Modelo de dados para operações de usuários no banco de dados
 */
class UserModel {
  /**
   * Cria um novo usuário no banco de dados
   * @async
   * @param {Object} data - Dados do usuário a ser criado
   * @param {string} data.email - Email do usuário
   * @param {string} data.password - Senha do usuário (já hashada)
   * @param {string} [data.role] - Role/papel do usuário
   * @returns {Promise<Object>} Usuário criado com ID
   * @throws {Error} Erro ao criar o usuário no banco de dados
   */
  async create(data) {
    return await prisma.user.create({ data });
  }

  /**
   * Encontra um usuário pelo email
   * @async
   * @param {string} email - Email do usuário a ser encontrado
   * @returns {Promise<Object|null>} Usuário encontrado com todos os campos ou null se não existir
   * @throws {Error} Erro ao consultar o banco de dados
   */
  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Encontra um usuário pelo ID (sem retornar a senha)
   * @async
   * @param {number|string} id - ID do usuário a ser encontrado
   * @returns {Promise<Object|null>} Usuário encontrado com ID, email e role (sem senha) ou null se não existir
   * @throws {Error} Erro ao consultar o banco de dados
   */
  async findById(id) {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
  }
}

module.exports = new UserModel();