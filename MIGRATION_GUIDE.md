# 🔄 Guia de Migração - Finance App Reestruturado

## ⚠️ IMPORTANTE: Leia antes de começar

Este guia vai te ajudar a migrar do código antigo para a nova estrutura organizada.

## 📋 Pré-requisitos

- Node.js instalado
- MongoDB em execução (ou string de conexão)
- npm ou yarn

## 🚀 Passo a Passo

### 1. Backup dos Dados

Antes de qualquer coisa, faça backup do seu banco de dados MongoDB atual.

### 2. Configurar Backend

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Copie o arquivo de exemplo
cp .env.example .env

# Edite o .env com suas configurações reais
nano .env  # ou use seu editor preferido
```

**Variáveis do .env:**
```
PORT=3001
MONGODB_URI=sua_string_de_conexao_mongodb
DB_NAME=nome_do_seu_banco
JWT_SECRET=seu_secret_jwt
NODE_ENV=development
```

### 3. Testar Backend

```bash
# Ainda na pasta backend
npm start
```

Você deve ver:
```
✅ Conectado ao MongoDB via Mongoose
📊 Database: nome_do_banco
🚀 Servidor rodando na porta 3001
```

Teste a API acessando: `http://localhost:3001/api`

### 4. Configurar Frontend

```bash
# Entre na pasta do frontend
cd ../frontend

# Instale as dependências
npm install
```

### 5. Atualizar URL da API (se necessário)

Abra `frontend/src/constants/index.js` e verifique a URL da API:

```javascript
export const API_URL = 'http://localhost:3001'; // ou sua URL de produção
```

### 6. Testar Frontend

```bash
# Ainda na pasta frontend
npm run dev
```

Acesse `http://localhost:5173` e faça login.

## 🔍 Comparação de Estruturas

### Antes (Estrutura Antiga)
```
backend/
├── server.js (818 linhas! 🙈)
└── package.json

frontend/
└── src/
    ├── FinanceApp.jsx (2422 linhas! 😱)
    └── Login.jsx
```

### Depois (Estrutura Nova)
```
backend/
├── src/
│   ├── config/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   └── utils/
└── server.js (25 linhas! 🎉)

frontend/
└── src/
    ├── api/
    ├── components/
    ├── pages/
    ├── context/
    ├── constants/
    └── utils/
```

## 💡 Principais Diferenças

### Backend

**ANTES:**
- Tudo em um arquivo server.js gigante
- Lógica misturada
- Difícil de manter

**DEPOIS:**
- Código separado em camadas
- Fácil de encontrar e corrigir bugs
- Cada arquivo tem uma responsabilidade única

### Frontend

**ANTES:**
- FinanceApp.jsx com 2422 linhas
- MoneyInput com bugs de formatação
- Componentes misturados

**DEPOIS:**
- Dashboard.jsx mais limpo
- Componentes organizados em pastas
- APIs separadas
- Context para estado global

## ⚡ Mudanças que Você Precisa Saber

### 1. MoneyInput Removido

O componente MoneyInput foi removido devido a bugs. Agora usamos inputs normais com validação:

```jsx
// ANTES
<MoneyInput value={valor} onChange={setValor} />

// DEPOIS
<input
  type="number"
  step="0.01"
  min="0"
  value={valor}
  onChange={(e) => setValor(e.target.value)}
  className="..."
/>
```

### 2. Imports Mudaram

**Dashboard.jsx:**
```jsx
// ANTES
import { formatCurrency } from './utils/formatters';
import ModalCategoria from './components/ModalCategoria';

// DEPOIS
import { formatCurrency } from '../utils/formatters';
import ModalCategoria from '../components/common/ModalCategoria';
```

### 3. Autenticação com Context

Agora usamos Context API:

```jsx
// No App.jsx
import { AuthProvider } from './context/AuthContext';

// Em qualquer componente
import { useAuth } from './context/AuthContext';

function MeuComponente() {
  const { user, logout } = useAuth();
  // ...
}
```

## 🐛 Resolução de Problemas

### Erro: "Cannot find module"

Verifique os imports. Os caminhos mudaram:
- `./componentes/...` → `../components/common/...`
- `./utils/...` → `../utils/...`

### Erro: "API not responding"

1. Verifique se o backend está rodando
2. Confira a URL em `constants/index.js`
3. Verifique o CORS no backend

### Erro: "Token inválido"

Limpe o localStorage:
```javascript
localStorage.clear();
```
E faça login novamente.

## ✅ Checklist de Migração

- [ ] Backup do banco de dados feito
- [ ] Backend instalado e rodando
- [ ] Frontend instalado e rodando
- [ ] Login funcionando
- [ ] Transações carregando
- [ ] Criar transação funcionando
- [ ] Editar transação funcionando
- [ ] Deletar transação funcionando
- [ ] Caixinhas funcionando
- [ ] Categorias funcionando
- [ ] Contas funcionando

## 📚 Recursos Adicionais

- README.md principal - Arquitetura completa
- Comentários no código - Explicações detalhadas
- /backend/src/ - Estrutura do backend
- /frontend/src/ - Estrutura do frontend

## 🎯 Próximos Passos Após Migração

1. **Teste Tudo**: Clique em tudo, teste todas as funcionalidades
2. **Personalize**: Ajuste cores, logos, etc em `constants/index.js`
3. **Deploy**: Quando estiver satisfeito, faça deploy
4. **Monitore**: Fique de olho nos logs por alguns dias

## 💬 Dúvidas?

- Consulte o README.md principal
- Leia os comentários no código
- Verifique a estrutura de pastas

---

**Boa migração! 🚀**
