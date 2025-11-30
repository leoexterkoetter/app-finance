const mongoose = require('mongoose');

const contaSchema = new mongoose.Schema({
  usuario_id: { type: String, required: true, index: true },
  nome: { type: String, required: true, trim: true },
  tipo: { 
    type: String, 
    required: true,
    enum: ['cartao_credito', 'cartao_debito', 'conta_corrente', 'poupanca', 'dinheiro']
  },
  limite: { type: Number, default: 0, min: 0 },
  saldo_atual: { type: Number, default: 0 },
  cor: { 
    type: String, 
    default: '#3B82F6',
    match: [/^#[0-9A-F]{6}$/i, 'Cor inválida']
  },
  icone: { type: String, default: 'CreditCard' },
  ativa: { type: Boolean, default: true },
  criado_em: { type: Date, default: Date.now }
}, { collection: 'contas' });

contaSchema.index({ usuario_id: 1, ativa: 1 });
contaSchema.index({ usuario_id: 1, tipo: 1 });

module.exports = mongoose.model('Conta', contaSchema);
