const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  senha: { type: String, required: true, minlength: 6 },
  criado_em: { type: Date, default: Date.now }
}, { collection: 'usuarios' });

module.exports = mongoose.model('Usuario', usuarioSchema);
