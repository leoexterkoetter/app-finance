require('dotenv').config();
const app = require('./src/config/app');
const { connectDatabase } = require('./src/config/database');
const { errorHandler } = require('./src/middlewares/errorHandler');
const routes = require('./src/routes');

const PORT = process.env.PORT || 3001;

// Conectar ao banco de dados
connectDatabase();

// Registrar rotas
app.use('/api', routes);

// Middleware de erro (deve ser o último)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Endpoints disponíveis:`);
  console.log(`   - Auth: POST /api/login, POST /api/cadastro`);
  console.log(`   - Transações: GET/POST/PUT/DELETE /api/transacoes`);
  console.log(`   - Caixinhas: GET/POST/PUT/DELETE /api/caixinhas`);
  console.log(`   - Categorias: GET/POST/PUT/DELETE /api/categorias`);
  console.log(`   - Contas: GET/POST/PUT/DELETE /api/contas`);
});
