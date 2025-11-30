const mongoose = require('mongoose');

const caixinhaSchema = new mongoose.Schema({
  usuario_id: { type: String, required: true, index: true },
  nome: { type: String, required: true, trim: true },
  valor_total: { type: Number, required: true, min: 0 },
  valor_pago: { type: Number, default: 0, min: 0 },
  parcelas_total: { type: Number, required: true, min: 1 },
  parcelas_pagas: { type: Number, default: 0, min: 0 },
  data_inicio: { 
    type: String, 
    required: true,
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Data inválida']
  },
  criado_em: { type: Date, default: Date.now }
}, { collection: 'caixinhas' });

caixinhaSchema.index({ usuario_id: 1, criado_em: -1 });

module.exports = mongoose.model('Caixinha', caixinhaSchema);
