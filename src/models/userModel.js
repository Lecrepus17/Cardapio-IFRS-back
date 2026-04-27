const prisma = require("../config/prisma"); // Importa a instância configurada do Prisma

/**
 * @typedef {object} UserPayload
 * @property {string} email - O email do usuário.
 * @property {string} password - A senha (hash) do usuário.
 * @property {string} [role='user'] - A permissão do usuário (ex: 'user', 'admin').
 */

/**
 * @typedef {UserPayload} User
 * @property {number} id - O ID único do usuário.
 */

/**
 * @class UserModel
 * @description Classe responsável pelas operações de banco de dados para usuários usando Prisma.
 */
class UserModel {
  /**
   * @description Busca um usuário no banco de dados pelo seu email.
   * @static
   * @async
   * @param {string} email - O email do usuário a ser procurado.
   * @returns {Promise<User|null>} Uma Promise que resolve para o objeto do usuário encontrado ou null se nenhum usuário for encontrado.
   * @throws {Error} Lança um erro se a consulta ao banco de dados falhar.
   */
  static async findByEmail(email) {
    // findUnique é muito mais rápido que findFirst/query crua,
    // mas exige que o campo 'email' tenha @unique no schema.prisma
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  /**
   * @description Cria um novo usuário no banco de dados.
   * @static
   * @async
   * @param {UserPayload} user - O objeto contendo os dados do usuário a ser criado.
   * @returns {Promise<number>} Uma Promise que resolve para o ID do usuário recém-criado.
   * @throws {Error} Lança um erro se a inserção no banco de dados falhar (ex: email duplicado).
   */
  static async create(user) {
    const { email, password, role } = user;

    // O Prisma retorna o objeto criado inteiro, não apenas o ID.
    const createdUser = await prisma.user.create({
      data: {
        email,
        password,
        role: role || undefined, // Se role for null/undefined, o Prisma usará o @default("user")
      },
    });

    // Retornamos apenas o id para manter compatibilidade com seu código original
    return createdUser.id;
  }
}

module.exports = UserModel;
