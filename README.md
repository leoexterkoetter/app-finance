# Finance App - Versão Reestruturada 🚀

## 📋 Sobre o Projeto

Aplicação financeira completa reestruturada seguindo as melhores práticas de arquitetura de software, com separação clara de responsabilidades e código organizado.

## 🏗️ Arquitetura

### Backend - MVC em Camadas

```
backend/
├── src/
│   ├── config/           # Configurações
│   │   ├── app.js        # Configuração Express
│   │   ├── database.js   # Conexão MongoDB
│   │   └── constants.js  # Constantes da aplicação
│   │
│   ├── models/           # Modelos Mongoose
│   │   ├── Usuario.js
│   │   ├── Transacao.js
│   │   ├── Caixinha.js
│   │   ├── Categoria.js
│   │   └── Conta.js
│   │
│   ├── repositories/     # Acesso ao banco de dados
│   │   ├── authRepository.js
│   │   ├── transacaoRepository.js
│   │   ├── caixinhaRepository.js
│   │   ├── categoriaRepository.js
│   │   └── contaRepository.js
│   │
│   ├── services/         # Lógica de negócio
│   │   ├── authService.js
│   │   ├── transacaoService.js
│   │   ├── caixinhaService.js
│   │   ├── categoriaService.js
│   │   └── contaService.js
│   │
│   ├── controllers/      # Controladores (HTTP)
│   │   ├── authController.js
│   │   ├── transacaoController.js
│   │   ├── caixinhaController.js
│   │   ├── categoriaController.js
│   │   └── contaController.js
│   │
│   ├── routes/           # Rotas HTTP
│   │   ├── index.js
│   │   ├── authRoutes.js
│   │   ├── transacaoRoutes.js
│   │   ├── caixinhaRoutes.js
│   │   ├── categoriaRoutes.js
│   │   └── contaRoutes.js
│   │
│   ├── middlewares/      # Middlewares
│   │   ├── auth.js       # Autenticação JWT
│   │   └── errorHandler.js
│   │
│   └── utils/            # Utilitários
│       ├── token.js      # Geração de tokens
│       └── helpers.js    # Funções auxiliares
│
├── server.js             # Arquivo principal
├── package.json
└── .env.example
```

#### Fluxo de Dados Backend

```
Request → Routes → Controllers → Services → Repositories → Database
                                     ↓
Response ← Controllers ← Services ← Repositories
```

### Frontend - Componentes em Camadas

```
frontend/
├── src/
│   ├── api/              # Chamadas HTTP
│   │   ├── axios.js      # Configuração Axios
│   │   ├── authApi.js
│   │   ├── transacoesApi.js
│   │   ├── caixinhasApi.js
│   │   ├── categoriasApi.js
│   │   └── contasApi.js
│   │
│   ├── components/       # Componentes React
│   │   ├── common/       # Componentes comuns
│   │   │   ├── DateSelector.jsx
│   │   │   ├── InsightCard.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ModalCategoria.jsx
│   │   │   └── ModalConta.jsx
│   │   │
│   │   ├── layout/       # Layout
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   └── features/     # Componentes específicos
│   │       ├── transactions/
│   │       ├── accounts/
│   │       ├── savings/
│   │       ├── categories/
│   │       └── reports/
│   │
│   ├── pages/            # Páginas completas
│   │   ├── Login.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── context/          # Contextos React
│   │   └── AuthContext.jsx
│   │
│   ├── constants/        # Constantes
│   │   └── index.js      # Configurações, cores, ícones
│   │
│   ├── services/         # Serviços
│   │   └── pdfExport.js
│   │
│   ├── utils/            # Utilitários
│   │   └── formatters.js # Formatação de valores
│   │
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Entry point
│   └── index.css         # Estilos globais
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Como Usar

### Backend

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o .env com suas configurações
```

4. Inicie o servidor:
```bash
npm start
```

O servidor estará rodando em `http://localhost:3001`

### Frontend

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## 📦 Tecnologias

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (autenticação)
- bcryptjs (hash de senhas)
- dotenv

### Frontend
- React + Vite
- Tailwind CSS
- Axios
- React Router
- React Hot Toast
- Lucide Icons
- Recharts

## ✨ Principais Melhorias

### Organização do Código
- ✅ Separação clara de responsabilidades
- ✅ Arquitetura em camadas (MVC)
- ✅ Código reutilizável
- ✅ Fácil manutenção e escalabilidade

### Backend
- ✅ Models isolados
- ✅ Repositories para acesso ao banco
- ✅ Services com lógica de negócio
- ✅ Controllers limpos
- ✅ Rotas organizadas
- ✅ Middlewares centralizados
- ✅ Tratamento de erros global

### Frontend
- ✅ APIs organizadas por domínio
- ✅ Context API para estado global
- ✅ Componentes reutilizáveis
- ✅ Constantes centralizadas
- ✅ Hooks customizados
- ✅ Rotas protegidas

## 🔄 Migrando do Código Antigo

Se você tem dados do projeto antigo:

1. O backend usa o mesmo banco de dados MongoDB
2. Os endpoints da API permanecem os mesmos
3. Basta apontar o frontend para o novo backend

## 🐛 Mudanças Importantes

### Removido
- ❌ MoneyInput component (bugs de formatação)
- ❌ Código duplicado
- ❌ Lógica misturada em componentes

### Adicionado
- ✅ Tratamento de erros aprimorado
- ✅ Validações centralizadas
- ✅ AuthContext para gerenciar autenticação
- ✅ Interceptors do Axios
- ✅ Rotas protegidas

## 📝 Endpoints da API

### Autenticação
- `POST /api/login` - Login
- `POST /api/cadastro` - Cadastro

### Transações
- `GET /api/transacoes/:usuario_id` - Listar
- `POST /api/transacoes` - Criar
- `POST /api/transacoes/parcelada` - Criar parcelada
- `PUT /api/transacoes/:id` - Atualizar
- `DELETE /api/transacoes/:id` - Deletar

### Caixinhas
- `GET /api/caixinhas/:usuario_id` - Listar
- `POST /api/caixinhas` - Criar
- `PUT /api/caixinhas/:id` - Atualizar
- `PUT /api/caixinhas/:id/pagar` - Pagar parcela
- `DELETE /api/caixinhas/:id` - Deletar

### Categorias
- `GET /api/categorias/:usuario_id` - Listar
- `POST /api/categorias` - Criar
- `PUT /api/categorias/:id` - Atualizar
- `DELETE /api/categorias/:id` - Deletar

### Contas
- `GET /api/contas/:usuario_id` - Listar
- `POST /api/contas` - Criar
- `PUT /api/contas/:id` - Atualizar
- `DELETE /api/contas/:id` - Deletar
- `GET /api/contas/:id/saldo` - Calcular saldo

## 🎯 Próximos Passos

Para continuar melhorando:

1. **Testes**: Adicionar testes unitários e de integração
2. **Validators**: Criar validators específicos para cada entidade
3. **Hooks Customizados**: Criar hooks como `useTransactions`, `useAccounts`
4. **Componentes**: Quebrar Dashboard.jsx em componentes menores
5. **TypeScript**: Migrar para TypeScript para maior segurança
6. **Docker**: Adicionar Dockerfiles para fácil deployment

## 📞 Suporte

Se tiver dúvidas sobre a estrutura reorganizada, consulte este README ou verifique os comentários no código.

---

**Versão**: 3.0-restructured
**Data**: Novembro 2024
