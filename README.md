<img width="1100" height="862" alt="capareadmeTT" src="https://github.com/user-attachments/assets/34ee0682-d629-4d66-987c-7c47d6f607ea" />


> 🚧 **Status do Projeto:** Em desenvolvimento (fase inicial)  
> 🗓️ Última atualização: Outubro de 2025  

---

## 🧠 Sobre o Projeto

O **TheTowerProject** é um sistema criado para auxiliar **professores autônomos de língua inglesa** no gerenciamento de seus alunos, aulas e pagamentos.  
Atualmente, o professor realiza todo o controle manualmente através de **planilhas Excel**, o que torna o processo trabalhoso e suscetível a erros.  

A proposta deste sistema é **centralizar e automatizar** todas as informações em um **painel intuitivo**, permitindo que o professor visualize rapidamente os principais dados de sua rotina — como alunos ativos, valores recebidos, pendências e estatísticas de desempenho.

---

## 🎯 Objetivos Principais

- ✅ Substituir o controle manual em Excel por um sistema dinâmico e automatizado.  
- 📊 Fornecer um **dashboard** visual com indicadores em tempo real.  
- 💰 Gerenciar **pagamentos, planos e mensalidades** dos alunos.  
- 👩‍🏫 Cadastrar e acompanhar **alunos, aulas e progresso individual**.  
- 📈 Permitir **análises e relatórios** de desempenho e receita.

---

## 🧩 Tecnologias Planejadas

| Camada | Tecnologias | Descrição |
|:-------|:-------------|:-----------|
| **Frontend** | HTML5, CSS3, JavaScript | Interface web responsiva e intuitiva. |
| **Banco de Dados** | MySQL | Armazenamento de alunos, pagamentos, aulas e relatórios. |
| **Backend (em discução)** | Node.js ou Python (futuro) | Processamento de dados e análise estatística. |
| **Bibliotecas e Ferramentas** | Chart.js, DataTables, Axios | Gráficos, tabelas dinâmicas e conexão com o banco. |

---

## 🏗️ Estrutura Inicial do Projeto

```
TheTowerProject/
│
├── index.html                  # Tela de login
├── dashboard.html              # Tela inicial com os 4 cards principais
├── turmas.html                 # Gestão de turmas e alunos
├── biblioteca.html             # Biblioteca e empréstimos
├── financas.html               # Controle financeiro
│
├── assets/
│   ├── css/
│   │   ├── style.css           # Estilos gerais (cores, layout base)
│   │   ├── dashboard.css       # Estilos do dashboard
│   │   ├── turmas.css          # Estilos da tela de turmas
│   │   ├── biblioteca.css      # Estilos da biblioteca
│   │   └── financas.css        # Estilos financeiros
│   │
│   ├── js/
│   │   ├── main.js             # Login e navegação
│   │   ├── dashboard.js        # Scripts do dashboard
│   │   ├── turmas.js           # CRUD de turmas e alunos
│   │   ├── biblioteca.js       # CRUD de livros
│   │   ├── financas.js         # Relatórios financeiros
│   │   └── api.js              # Arquivo que centraliza as requisições à API
│   │
│   └── img/
│       ├── icons/
│       └── logos/
│
├── backend/                    # Mini servidor Node.js + Express + MySQL
│   ├── index.js                # Arquivo principal do servidor
│   ├── db_config.js            # Conexão com o banco
│   ├── routes/
│   │   ├── alunos.js
│   │   ├── turmas.js
│   │   ├── biblioteca.js
│   │   └── financas.js
│   └── package.json            # Dependências do Node (Express, MySQL2, etc.)
│
├── database/
│   └── thetower_db.sql         # Script de criação do banco e tabelas
│
└── docs/
    ├── README.md
    ├── requisitos.md
    └── wireframes/

```
---

## 🧱 Estrutura do Banco de Dados (MySQL)

**Tabelas planejadas:**

- `Turmas` — Dados do professor (nome, e-mail, senha, etc.)  
- `Alunos` — Cadastro de alunos  
- `pagamentos` — Histórico e status de pagamentos  
- `Aulas` — Registro das aulas  
- `mensalidades` — Planos e pacotes de aulas  
- `estatisticas` — Dados para gráficos e relatórios  

---

## 📈 Próximos Passos

- [ ] Criar o banco de dados inicial no MySQL  
- [ ] Implementar a conexão via JavaScript (Node ou direto no cliente)  
- [ ] Construir o layout base do dashboard  
- [ ] Adicionar os primeiros gráficos de análise  
- [ ] Desenvolver o sistema de login e autenticação  

---

## 💡 Ideia Central

> “Transformar a gestão de aulas particulares em algo simples, visual e inteligente — permitindo que o professor foque no que realmente importa: ensinar.”

---

## 👨‍💻 Autor

**Alexander (Clayver)**  
📍 Desenvolvedor em formação | Amante de tecnologia e educação  
📧 *Em breve: contato profissional e site do projeto*

---

## 🪪 Licença

Este projeto é de uso **educacional e pessoal**, sem fins comerciais.  
© 2025 — Todos os direitos reservados a Alexander.

---
