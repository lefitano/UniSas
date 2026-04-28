# Gerenciamento de Usuários — UniSAS

## Modelo adotado: Auto-cadastro por perfil (Opção 2)

Neste modelo, **qualquer pessoa pode se cadastrar** escolhendo seu próprio perfil
(Aluno, Professor, Responsável ou Diretor). O perfil escolhido determina
o que o usuário pode ver e fazer dentro do sistema.

Não existe hierarquia de criação de contas — cada usuário gerencia o próprio acesso.

---

## O CRUD de Usuário

CRUD significa as 4 operações básicas que todo sistema de dados precisa ter:

| Letra | Operação | Em português | No UniSAS |
|---|---|---|---|
| **C** | Create | Criar | Cadastrar conta nova |
| **R** | Read | Ler | Ver os dados do perfil / Dashboard |
| **U** | Update | Atualizar | Editar nome, senha, etc. |
| **D** | Delete | Deletar | Excluir a própria conta |

### C — Create (Criar)
O usuário acessa a tela de **Criar conta**, preenche os dados do seu perfil
e o sistema salva no banco de dados.

Cada perfil tem campos específicos:

| Perfil | Campos do cadastro |
|---|---|
| Aluno | Nome, Email, Matrícula, Senha |
| Professor | Nome, Email, SIAPE, Disciplina, Senha |
| Responsável | Nome, Email, CPF, Matrícula do filho, Senha |
| Diretor | Nome, Email, CPF, Nome da escola, Senha |

### R — Read (Ler)
Após o login, o sistema **busca os dados do usuário no banco** e exibe
no Dashboard. O nome, cargo e informações exibidas serão os dados reais
que o usuário cadastrou, não dados fixos no código.

### U — Update (Atualizar)
O usuário acessa a tela **Editar perfil** e pode alterar seus dados
(exceto o perfil — para mudar de perfil, precisaria criar uma nova conta).

### D — Delete (Deletar)
O usuário acessa **Configurações** e pode excluir a própria conta.
Todos os dados são removidos do banco de dados.

---

## Como o sistema identifica e controla cada usuário

### 1. Cadastro — o usuário se registra

```
Usuário preenche o formulário
        ↓
Backend salva no banco de dados:
  - id (gerado automaticamente)
  - nome
  - email
  - senha (criptografada, nunca salva em texto puro)
  - perfil (ALUNO / PROFESSOR / RESPONSAVEL / DIRETOR)
  - campos extras do perfil (matrícula, SIAPE, CPF, etc.)
```

### 2. Login — o usuário prova que é ele

```
Usuário informa email + senha
        ↓
Backend verifica se o email existe no banco
        ↓
Backend compara a senha informada com a senha criptografada salva
        ↓
Se correto → backend gera um TOKEN JWT e envia para o frontend
```

### O que é o Token JWT?

É uma string longa que o backend gera e entrega ao usuário após o login.
Dentro dela estão as informações do usuário de forma segura:

```
{
  "id": 1,
  "nome": "Ana Souza",
  "perfil": "ALUNO",
  "expira": "2026-04-28T00:00:00"
}
```

O frontend guarda esse token e o envia em toda requisição futura.
É como um crachá digital com validade.

### 3. Autorização — o sistema decide o que cada um pode ver

Com base no campo `perfil` dentro do token, o backend libera ou bloqueia
o acesso a cada funcionalidade:

```
perfil = ALUNO       → acessa: notas, frequência, atividades, chat
perfil = PROFESSOR   → acessa: turmas, conteúdos, banco de questões, chat
perfil = RESPONSAVEL → acessa: dados do filho, frequência, notas, chat
perfil = DIRETOR     → acessa: painel geral, turmas, professores, alunos, relatórios
```

Se um Aluno tentar acessar uma rota de Diretor, o backend retorna erro 403 (Proibido).

---

## Fluxo completo de telas

```
┌─────────────────────────────────────────────────────┐
│                   TELA 1 — Início                   │
│              Seleção de perfil ( / )                │
│                                                     │
│   [📚 Aluno] [🎓 Professor] [👨‍👧 Responsável] [🏫 Diretor] │
└──────────────────────┬──────────────────────────────┘
                       │ clica no perfil desejado
                       ↓
┌─────────────────────────────────────────────────────┐
│             TELA 2 — Login / Cadastro               │
│              /auth/:perfil                          │
│                                                     │
│  ┌─────────────┬─────────────┐                      │
│  │   Entrar    │ Criar conta │  ← abas              │
│  └─────────────┴─────────────┘                      │
│                                                     │
│  Entrar:        Email + Senha                       │
│  Criar conta:   Campos específicos do perfil        │
│                                                     │
│  [← Trocar perfil]                                  │
└──────────────────────┬──────────────────────────────┘
                       │ login ou cadastro bem-sucedido
                       ↓
┌─────────────────────────────────────────────────────┐
│              TELA 3 — Dashboard                     │
│           /dashboard/:perfil                        │
│                                                     │
│  Exibe dados reais do usuário logado                │
│  Conteúdo diferente para cada perfil                │
│                                                     │
│  [Topo: nome do usuário + avatar + botão de perfil] │
└──────────┬──────────────────────┬───────────────────┘
           │                      │
           ↓                      ↓
┌──────────────────┐   ┌─────────────────────────────┐
│  TELA 4          │   │  TELA 5                     │
│  Editar Perfil   │   │  Configurações              │
│  /perfil/editar  │   │  /perfil/configuracoes      │
│                  │   │                             │
│  Alterar:        │   │  - Excluir conta (Delete)   │
│  - Nome          │   │  - Sair (Logout)            │
│  - Email         │   │                             │
│  - Senha         │   └─────────────────────────────┘
│  - Campos extras │
└──────────────────┘
```

---

## Resumo: quem faz o quê

| Usuário | Cria conta? | Edita conta? | Exclui conta? | Controla outros? |
|---|---|---|---|---|
| Aluno | Sim (própria) | Sim (própria) | Sim (própria) | Não |
| Professor | Sim (própria) | Sim (própria) | Sim (própria) | Não |
| Responsável | Sim (própria) | Sim (própria) | Sim (própria) | Não |
| Diretor | Sim (própria) | Sim (própria) | Sim (própria) | Não |

Neste modelo, **cada usuário gerencia apenas a própria conta.**
O sistema diferencia o que cada um vê pelo campo `perfil` armazenado no banco.

---

## Tecnologias envolvidas

| Camada | Tecnologia | Responsabilidade |
|---|---|---|
| Frontend | React + React Router | Telas, formulários, navegação |
| Backend | Spring Boot (Java) | Regras de negócio, validações |
| Segurança | JWT | Autenticação e autorização |
| Banco de dados | (a definir pelo grupo) | Armazenar os dados dos usuários |
| Criptografia | BCrypt | Proteger as senhas no banco |
