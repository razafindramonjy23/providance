# Guide de déploiement sur Vercel

## ✅ Migration terminée : SQLite → PostgreSQL

Votre application a été migrée de SQLite (`better-sqlite3`) vers PostgreSQL. C'est requis pour Vercel qui ne supporte pas les bases de données locales.

## 📋 Étapes de déploiement

### 1. Préparer votre repository Git

```bash
git add .
git commit -m "Migrate to PostgreSQL for Vercel deployment"
git push origin main
```

### 2. Créer une base de données Vercel Postgres (gratuit)

#### Option A : Dashboard Vercel (Recommandé)
1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Créez un nouveau projet ou sélectionnez un existant
3. Allez dans **Storage** → **Create Database** → **Postgres**
4. Copiez la `CONNECTION_STRING` fournie

#### Option B : Base de données externe
Vous pouvez utiliser n'importe quel provider PostgreSQL :
- **Neon**: https://neon.tech (gratuit)
- **Railway**: https://railway.app
- **Supabase**: https://supabase.com
- **AWS RDS**, **DigitalOcean**, etc.

### 3. Configurer les variables d'environnement sur Vercel

1. Dans le dashboard Vercel, allez à **Settings** → **Environment Variables**
2. Ajoutez :
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://...` (votre connection string)
3. Cliquez **Save**

### 4. Déployer sur Vercel

#### Via GitHub (Recommandé)
```bash
# 1. Assurez-vous que le code est sur GitHub
# 2. Allez sur https://vercel.com/new
# 3. Importez votre repository GitHub
# 4. Les variables d'environnement seront automatiquement appliquées
# 5. Cliquez "Deploy"
```

#### Via Vercel CLI
```bash
npm install -g vercel
vercel
# Suivez les prompts, il détectera Next.js automatiquement
```

### 5. Initialiser la base de données (première fois seulement)

Après le déploiement, la base de données sera créée automatiquement au premier appel.
Si vous voulez initialiser manuellement :

```bash
# Localement pour tester
npm run dev
# Visitez http://localhost:3000 pour déclencher l'initialisation
```

## 🔧 Variables d'environnement requises

`.env.local` (local development) ou **Environment Variables** sur Vercel :

```env
DATABASE_URL=postgresql://user:password@host:port/database
```

## 📱 Structure de la base de données

La table `users` est créée automatiquement avec :
- `id` (TEXT PRIMARY KEY)
- `email` (TEXT UNIQUE NOT NULL)
- `password` (TEXT NOT NULL)
- `name` (TEXT NOT NULL)
- `level` (TEXT NOT NULL)
- `role` (superuser, admin, user)
- `createdAt` (TEXT NOT NULL)

Utilisateurs par défaut (seeds) :
- Email: `superuser@clickclick.com` / Password: `super123` (Role: superuser)
- Email: `admin@clickclick.com` / Password: `admin123` (Role: admin)
- Email: `demo@clickclick.com` / Password: `demo123` (Role: user)

## 🚀 Performance sur Vercel

- ✅ Serverless-ready : Les routes API sont stateless
- ✅ Connection pooling : La bibliothèque `pg` gère automatiquement les connexions
- ✅ Scalable : PostgreSQL gère bien les pics de trafic

## ⚠️ Dépannage

### "DATABASE_URL is not set"
→ Assurez-vous que la variable d'environnement est configurée sur Vercel

### "Connection refused"
→ Vérifiez que la connection string est correcte et que la base de données est accessible

### "ENOTFOUND"
→ Le DNS ne peut pas résoudre le host. Vérifiez la connection string

### Tester la connexion localement
```bash
npm run dev
# Visitez http://localhost:3000/api/users/list
# Devrait retourner une liste d'utilisateurs
```

## 📚 Ressources

- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Vercel Deployment](https://vercel.com/docs/deployments)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node.js pg Documentation](https://node-postgres.com/)

## ✨ Qu'est-ce qui a changé

### Avant (SQLite)
```typescript
import Database from 'better-sqlite3'
const db = new Database('clickclick.db')
const stmt = db.prepare('SELECT * FROM users')
const users = stmt.all()
```

### Après (PostgreSQL)
```typescript
import { getPool } from '@/lib/db/init'
const pool = getPool()
const result = await pool.query('SELECT * FROM users')
const users = result.rows
```

Les routes API ont aussi été mises à jour pour utiliser `async/await`.
