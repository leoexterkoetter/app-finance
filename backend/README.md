# Finance App - Backend API 🚀

API RESTful para aplicação de gestão financeira pessoal.

## 🚂 Deploy no Railway

### Passo a Passo:

1. **Crie um novo projeto no Railway**
2. **Conecte este repositório**
3. **Configure as variáveis de ambiente:**
   - `MONGODB_URI` = sua string de conexão MongoDB
   - `JWT_SECRET` = um secret aleatório
   - `DB_NAME` = nome do banco (ex: finance)
   - `PORT` = 3001 (opcional, Railway configura automático)

4. **Deploy automático!** ✅

## ⚙️ Variáveis de Ambiente Obrigatórias

```env
MONGODB_URI=mongodb://...
JWT_SECRET=seu_secret_muito_secreto_aqui
DB_NAME=finance
```

## 📡 Endpoints da API

- `POST /api/login` - Login
- `POST /api/cadastro` - Cadastro
- `GET /api/transacoes/:usuario_id` - Listar transações
- `POST /api/transacoes` - Criar transação
- `POST /api/transacoes/parcelada` - Criar parcelada
- E mais...

## 🏗️ Arquitetura

```
src/
├── config/       → Configurações (database, app, constants)
├── models/       → Schemas Mongoose (Usuario, Transacao, etc)
├── repositories/ → Acesso ao banco de dados
├── services/     → Lógica de negócio
├── controllers/  → Lógica das rotas HTTP
├── routes/       → Definição dos endpoints
├── middlewares/  → Auth JWT, Error Handler
└── utils/        → Token, Helpers
```

## 🚀 Rodar Localmente

```bash
npm install
cp .env.example .env
# Edite o .env com suas configurações
npm start
```

## 📝 Tecnologias

- Node.js + Express
- MongoDB + Mongoose  
- JWT + bcryptjs
- Arquitetura MVC em camadas
