# THE TOWER IDIOMAS

---

![capareadmeTT](https://github.com/user-attachments/assets/91cbaec4-9f0a-4794-bc42-9ae7674b3195)

---

## 🔗 [Acesse o site](https://clayalexssander.github.io/TheTowerProject/)

## 📘 Sobre o Projeto

O **TheTowerProject** é um sistema criado para auxiliar **professores autônomos de língua inglesa** no gerenciamento de seus alunos, aulas e pagamentos.  
Atualmente, o professor realiza todo o controle manualmente através de **planilhas Excel**, o que torna o processo trabalhoso e suscetível a erros.

A proposta deste sistema é **centralizar e automatizar** todas as informações em um **painel intuitivo**, permitindo que o professor visualize rapidamente os principais dados de sua rotina — como alunos ativos, valores recebidos, pendências e estatísticas de desempenho.

## 🖥️ Landing Page

Desenvolvida para divulgar o curso do professor e captar novos alunos, com foco em design responsivo e experiência do usuário.

---

## 🎯 Objetivos Principais

- ✅ Substituir o controle manual em Excel por um sistema dinâmico e automatizado.
- 📊 Fornecer um **dashboard** visual com indicadores em tempo real.
- 💰 Gerenciar **pagamentos, planos e mensalidades** dos alunos.
- 👩‍🏫 Cadastrar e acompanhar **alunos, aulas e progresso individual**.
- 📈 Permitir **análises e relatórios** de desempenho e receita.

---

## 🛠️ Tecnologias Utilizadas

| Camada                        | Tecnologias                 | Descrição                                                |
| :---------------------------- | :-------------------------- | :------------------------------------------------------- |
| **Frontend**                  | HTML5, CSS3, JavaScript     | Interface web responsiva e intuitiva.                    |
| **Banco de Dados**            | MySQL                       | Armazenamento de alunos, pagamentos, aulas e relatórios. |
| **Backend (em discução)**     | Node.js                     | Processamento de dados e análise estatística.            |
| **Bibliotecas e Ferramentas** | Chart.js, DataTables, Axios | Gráficos, tabelas dinâmicas e conexão com o banco.       |

---

## 📦 Estrutura Final do Projeto

```
TheTowerProject/
│
├── Index.html
│
├── backend/
│ │
│ ├── database_scripts/
│ │ ├── populaBanco.sql
│ │ ├── procedures_Principais.sql
│ │ ├── thetower_db.sql
│ │ ├── trigger.sql
│ │ └── views.sql
│ │
│ ├── node_modules/
│ │
│ ├── routes/
│ │ ├── alunos.js
│ │ ├── aulas_demonstrativas.js
│ │ ├── aulas_js
│ │ ├── auth.js
│ │ ├── biblioteca.js
│ │ ├── cadastra_material.js
│ │ ├── dashboard.js
│ │ ├── estoque.js
│ │ ├── financas.js
│ │ ├── presencas.js
│ │ └── turmas.js
│ │
│ ├── db_config.js
│ ├── package-lock.json
│ ├── package.json
│ └── server.js
│
├── frontend/
│ │
│ ├── alunos.html
│ ├── aula.html
│ ├── aulas_demonstrativas.html
│ ├── biblioteca.html
│ ├── cadastra_material.html
│ ├── criar_turma.html
│ ├── dashboard.html
│ ├── estoque.html
│ ├── eventos.html
│ ├── financas.html
│ ├── home.html
│ ├── login.html
│ ├── matricular_aluno.html
│ ├── turma_info.html
│ └── turmas.html
│
│ └── assets/
│ ├── css/
│ │ ├── alunos.css
│ │ ├── aula.css
│ │ ├── aulas_demonstrativas.css
│ │ ├── biblioteca.css
│ │ ├── cadastra_material.css
│ │ ├── criar_turma.css
│ │ ├── dashboard.css
│ │ ├── estoque.css
│ │ ├── financas.css
│ │ ├── home.css
│ │ ├── matricular_aluno.css
│ │ ├── style.css
│ │ ├── turma_info.css
│ │ └── turmas.css
│ │
│ └── js/
│ ├── alunos.js
│ ├── api.js
│ ├── aula.js
│ ├── aulas_demonstrativas.js
│ ├── biblioteca.js
│ ├── cadastra_material.js
│ ├── criar_turma.js
│ ├── dashboard.js
│ ├── estoque.js
│ ├── eventos.js
│ ├── home.js
│ ├── main.js
│ ├── matricular_alunos.js
│ ├── turma_info.js
│ ├── turmas.js
│ └── validation.js
│
├── materiais/
│ ├── book1
│ ├── book2
│ ├── book3
│ ├── book4
│ ├── book5
│ ├── book6
│ ├── debates
│ └── fairy_tales
│
└── Landing page/
│
├── data.json
├── depoimentos.html
├── eventos.html
├── footer.html
├── hero.html
├── metodologia.html
├── modalidades.html
├── planos.html
├── sistema.html
├── sobre.html
├── style.html
└── tipodeaula.html
│
└── assets/
├── img/
│ ├── bandeiras/
│ ├── BR.png
│ ├── chart-3d.webp
│ ├── clipboard-3d.webp
│ ├── ConversacaoMensal.jpg
│ ├── DE.png
│ ├── depo_cristina.png
│ ├── depo_daniel.png
│ ├── depo_gabriel.png
│ ├── depo_gusttavo.png
│ ├── depo_larissa.jpg
│ ├── depo_vinicius.jpg
│ ├── ES.png
│ ├── estatua_liberdade.webp
│ ├── IT.png
│ ├── Logo.png
│ ├── NL.png
│ ├── Passeiosinterativos.jpg
│ ├── prof_livro.webp
│ ├── professor.webp
│ └── US.png
│
├── css/
│ ├── depoimentos.css
│ ├── eventos.css
│ ├── footer.css
│ ├── hero.css
│ ├── metodologia.css
│ ├── modalidades.css
│ ├── planos.css
│ ├── sistema.css
│ ├── sobre.css
│ ├── style.css
│ └── tipodeaula.css
│
└── js/
├── depoimentos.js
├── eventos.js
├── footer.js
├── hero.js
├── metodologia.js
├── modalidades.js
├── planos.js
├── sistema.js
├── sobre.js
├── style.js
└── tipodeaula.js
```

---

## 🗃️ Estrutura do Banco de Dados (MySQL)

- `Turmas` — Dados do professor (nome, e-mail, senha, etc.)
- `Alunos` — Cadastro de alunos
- `pagamentos` — Histórico e status de pagamentos
- `Aulas` — Registro das aulas
- `mensalidades` — Planos e pacotes de aulas
- `estatisticas` — Dados para gráficos e relatórios

## 🚀 Como Executar o TheTowerProject

### 📦 1. Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- 🐬 **MySQL Workbench**
- 🟢 **Node.js + npm**

### 🗄️ 2. Configuração do Banco de Dados

1. Abra o **MySQL Workbench**.
2. Acesse a pasta `backend/database_scripts/`.
3. Execute os arquivos **na seguinte ordem**:

   1. `thetower_db.sql`
   2. `procedures_Principais.sql`
   3. `triggers.sql`
   4. `views.sql`
   5. `populaBanco.sql`

> ⚠️ Essa sequência garante que todas as tabelas, procedures e dados iniciais sejam criados corretamente.

### 🛠️ 3. Configuração do Backend

1. Abra a pasta `backend/`.
2. Edite o arquivo `db_config.js` e altere o campo **password** para a senha do seu MySQL Workbench.
3. No VS Code, abra o terminal e execute:

```
cd backend
```

4. Instale as dependências:

```
npm install
```

5. Inicie o servidor backend

```
node server.js
```

> O backend estará rodando (geralmente em http://localhost:3000).

### 🌐 4. Executar o Frontend

-Abra o arquivo login.html na pasta principal.
-Execute usando o Live Server do VS Code.

### 🔐 5. Login padrão (Administrador)

- 👤 Usuário: user2
- 🔑 Senha: 123

---

## 💡 Ideia Central

> “Transformar a gestão de aulas particulares em algo simples, visual e inteligente — permitindo que o professor foque no que realmente importa: ensinar.”

---

## 👨‍💻 Autores

### 🖥️ Sistema TheTower

**Clayver Alexssander**  
Responsável pelo desenvolvimento do sistema principal.

### 🌐 Landing Page

**Jheniffer Aparecida**  
**Júlia Henrique Martins Steiner**  
**Thalita Ferreira**
**Maria Luiza Melo Coelho**
Responsável pela criação da landing page e experiência do usuário.

---

## 🪪 Licença

Este projeto é de uso **educacional e pessoal**, sem fins comerciais.  
© 2025 — Todos os direitos reservados a Alexander.

---
