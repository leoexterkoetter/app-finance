const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  usuario_id: { type: String, required: true, index: true },
  nome: { type: String, required: true, trim: true },
  icone: { type: String, default: 'Tag' },
  cor: { 
    type: String, 
    default: '#6B7280',
    match: [/^#[0-9A-F]{6}$/i, 'Cor inválida (use #RRGGBB)']
  },
  tipo: { 
    type: String, 
    required: true,
    enum: ['fixo', 'variavel', 'receita'],
    lowercase: true
  },
  criado_em: { type: Date, default: Date.now }
}, { collection: 'categorias_customizadas' });

categoriaSchema.index({ usuario_id: 1, nome: 1 }, { unique: true });
categoriaSchema.index({ usuario_id: 1, tipo: 1 });

module.exports = mongoose.model('Categoria', categoriaSchema);
