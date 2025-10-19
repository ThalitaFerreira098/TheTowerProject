
const express = require('express');
const cors =  require('cors');
const authRoutes = require("./routes/auth");
const turmasRoutes = require('./routes/turmas');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//rota principal
app.use('/api', authRoutes);
app.use("/turmas", turmasRoutes);

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`)); 