const bcrypt = require('bcryptjs');
const authRepository = require('../repositories/authRepository');
const { generateToken } = require('../utils/token');

class AuthService {
  async cadastrar({ nome, email, senha }) {
    // Validações
    if (!nome || !email || !senha) {
      throw new Error('Campos obrigatórios: nome, email, senha');
    }

    // Verificar se email já existe
    const existente = await authRepository.findByEmail(email);
    if (existente) {
      throw new Error('Email já cadastrado');
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar usuário
    const usuario = await authRepository.create({
      nome,
      email,
      senha: senhaHash
    });

    // Gerar token
    const token = generateToken({
      id: usuario._id.toString(),
      email: usuario.email
    });

    return {
      id: usuario._id.toString(),
      nome: usuario.nome,
      email: usuario.email,
      token
    };
  }

  async login({ email, senha }) {
    // Validações
    if (!email || !senha) {
      throw new Error('Campos obrigatórios: email, senha');
    }

    // Buscar usuário
    const usuario = await authRepository.findByEmail(email);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar senha
    const senhaValida = usuario.senha.startsWith('$2')
      ? await bcrypt.compare(senha, usuario.senha)
      : usuario.senha === senha;

    if (!senhaValida) {
      throw new Error('Senha incorreta');
    }

    // Gerar token
    const token = generateToken({
      id: usuario._id.toString(),
      email: usuario.email
    });

    return {
      id: usuario._id.toString(),
      nome: usuario.nome,
      email: usuario.email,
      token
    };
  }
}

module.exports = new AuthService();
