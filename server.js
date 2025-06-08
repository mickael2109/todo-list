import express from 'express'
import fs from 'fs'
import { execSync } from 'child_process'
import todoRouter from './router/todoRouter.js'
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// 📁 Chemin vers la base SQLite
const DB_PATH = './prisma/dev.db';

// ✅ Vérifier si le fichier de base existe
if (!fs.existsSync(DB_PATH)) {
  console.log("Base de données non trouvée. Création en cours...");
  try {
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
    console.log("Base de données créée avec succès !");
  } catch (err) {
    console.error("Erreur lors de la création de la base :", err);
    process.exit(1);
  }
}

app.use("/", todoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
