function errorHandler(err, req, res, next) {
  console.error('❌ Erro:', err);
  
  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  
  // Erro de cast (ID inválido)
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'ID inválido' });
  }
  
  // Erro padrão
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
}

module.exports = { errorHandler };
