## Link do site: https://clayalexssander.github.io/TheTowerProject/
<img width="1100" height="862" alt="capareadmeTT" src="https://github.com/user-attachments/assets/34ee0682-d629-4d66-987c-7c47d6f607ea" />


> 🚧 **Status do Projeto:** Em desenvolvimento (fase Final)  
> 🗓️ Última atualização: Novembro de 2025  

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
├── home.html                   # Tela de principal
├── dashboard.html              # Tela inicial com cards de resumo
├── turmas.html                 # Gestão de turmas e alunos
├── criar_turma.html            # Tela para criar turmas
├── turma_info.html             # Tela para apresentar informações de uma turma
├── biblioteca.html             # Biblioteca e empréstimos
├── financas.html               # Controle financeiro
├── eventos.html                # Gestão e participação em eventos
├── estoque.html                # Controle de materiais e livros
├── aulas_demonstrativas.html   # Agendamento e controle de aulas demonstrativas
│
├── assets/
│   ├── css/
│   │   ├── style.css           # Estilos gerais (layout, cores, tipografia)
│   │   ├── dashboard.css
│   │   ├── turmas.css
│   │   ├── home.css  
│   │   ├── biblioteca.css
│   │   ├── financas.css
│   │   ├── eventos.css         # Estilos da página de eventos
│   │   ├── estoque.css         # Estilos da página de estoque
│   │   └── aulas_demonstrativas.css  # Estilos da página de aulas demonstrativas
│   │
│   ├── js/
│   │   ├── main.js             # Login, navegação e autenticação
│   │   ├── home.js             # saudação personalizada ao usuário
│   │   ├── dashboard.js        # Scripts do painel principal
│   │   ├── turmas.js           # CRUD de turmas e alunos
│   │   ├── biblioteca.js       # CRUD de livros e empréstimos
│   │   ├── financas.js         # Controle de pagamentos e relatórios
│   │   ├── eventos.js          # CRUD de eventos e controle de participantes
│   │   ├── estoque.js          # CRUD de materiais (ex: livros fornecidos)
│   │   ├── aulas_demonstrativas.js  # Agendamento e controle de aulas 
│   │   ├── api.js              # Centralização das requisições à API
│   │   └── validation.js       # Validações de formulários (reaproveitável)
│   │
│   │
│   └── materiais/
│   │    ├── books/
│   │    ├── farytales/
│   │    └── debates/
│   │
│   └── img/
│       ├── icons/
│       └── logos/
│
├── backend/
│   ├── index.js                # Servidor Node.js (Express)
│   ├── db_config.js            # Conexão MySQL
│   ├── routes/
│   │   ├── alunos.js
│   │   ├── turmas.js
│   │   ├── auth.js
│   │   ├── biblioteca.js
│   │   ├── financas.js
│   │   ├── eventos.js          # Rotas de CRUD de eventos
│   │   ├── estoque.js          # Rotas de CRUD de materiais
│   │   └── aulas_demonstrativas.js  # Rotas de CRUD de aulas demonstrativas
│   └── package.json
│
├── database/
│   └── thetower_db.sql         # Script SQL (inclui novas tabelas: eventos, estoque e aulas)
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

- [OK] Criar o banco de dados inicial no MySQL  
- [OK] Implementar a conexão via JavaScript (Node ou direto no cliente)  
- [ ] Construir o layout base do dashboard  
- [ ] Adicionar os primeiros gráficos de análise  
- [OK] Desenvolver o sistema de login e autenticação  

---

## 💡 Ideia Central

> “Transformar a gestão de aulas particulares em algo simples, visual e inteligente — permitindo que o professor foque no que realmente importa: ensinar.”

---

## 👨‍💻 Autor

**Alexssander (Clayver)**  
📍 Desenvolvedor em formação | Amante de tecnologia e educação  
📧 *Em breve: contato profissional e site do projeto*

---

## 🪪 Licença

Este projeto é de uso **educacional e pessoal**, sem fins comerciais.  
© 2025 — Todos os direitos reservados a Alexander.

---
