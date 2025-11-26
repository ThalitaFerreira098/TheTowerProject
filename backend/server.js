
const express = require('express');
const cors =  require('cors');
const authRoutes = require("./routes/auth");
const turmasRoutes = require('./routes/turmas');
const aulasRoutes=  require("./routes/aulas");
const presencaRoutes = require("./routes/presencas");
const alunosRoutes = require("./routes/alunos");
const cadastraMaterialRoutes = require("./routes/cadastra_material.js");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//rota principal
app.use('/api', authRoutes);
app.use("/api/turmas", turmasRoutes);
app.use("/api/aulas", aulasRoutes);
app.use("/api/presencas", presencaRoutes );
app.use("/api/alunos", alunosRoutes);
app.use("/api/cadastra-material", cadastraMaterialRoutes);



app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`)); 