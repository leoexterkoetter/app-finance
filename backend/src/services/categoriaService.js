const categoriaRepository = require('../repositories/categoriaRepository');
const transacaoRepository = require('../repositories/transacaoRepository');
const { formatMongoDocs } = require('../utils/helpers');

class CategoriaService {
  async listarPorUsuario(usuarioId) {
    const categorias = await categoriaRepository.findByUserId(usuarioId);
    return formatMongoDocs(categorias);
  }

  async criar({ usuario_id, nome, icone, cor, tipo }) {
    if (!usuario_id || !nome || !tipo) {
      throw new Error('Campos obrigatórios: usuario_id, nome, tipo');
    }

    // Verificar duplicata
    const existente = await categoriaRepository.findByUserIdAndName(usuario_id, nome);
    if (existente) {
      throw new Error('Já existe uma categoria com este nome');
    }

    const categoria = await categoriaRepository.create({
      usuario_id,
      nome,
      icone: icone || 'Tag',
      cor: cor || '#6B7280',
      tipo
    });

    return {
      id: categoria._id.toString(),
      ...categoria.toObject()
    };
  }

  async atualizar(id, { nome, icone, cor, tipo }) {
    const update = {};
    if (nome) update.nome = nome;
    if (icone) update.icone = icone;
    if (cor) update.cor = cor;
    if (tipo) update.tipo = tipo;

    await categoriaRepository.update(id, update);
  }

  async deletar(id) {
    // Verificar se há transações usando essa categoria
    const count = await transacaoRepository.countByCategoriaId(id);

    if (count > 0) {
      throw new Error(`Não é possível deletar. Existem ${count} transações usando esta categoria.`);
    }

    await categoriaRepository.delete(id);
  }
}

module.exports = new CategoriaService();
