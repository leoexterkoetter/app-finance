const mongoose = require('mongoose');

const transacaoSchema = new mongoose.Schema({
  usuario_id: { type: String, required: true, index: true },
  valor: { type: Number, required: true, min: 0 },
  categoria: { type: String, required: true, trim: true },
  tipo: { 
    type: String, 
    required: true, 
    enum: ['gasto', 'receita'],
    lowercase: true 
  },
  data: { 
    type: String, 
    required: true,
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (use YYYY-MM-DD)']
  },
  descricao: { type: String, default: '', trim: true },
  fixo: { type: Boolean, default: false },
  pago: { type: Boolean, default: false },
  parcelas: { type: Number, default: 1, min: 1 },
  parcela_atual: { type: Number, default: 1, min: 1 },
  conta_id: { type: String, default: null },
  categoria_custom_id: { type: String, default: null },
  criado_em: { type: Date, default: Date.now }
}, { collection: 'transacoes' });

// Índices compostos
transacaoSchema.index({ usuario_id: 1, data: -1 });
transacaoSchema.index({ usuario_id: 1, tipo: 1 });
transacaoSchema.index({ usuario_id: 1, pago: 1 });

module.exports = mongoose.model('Transacao', transacaoSchema);
