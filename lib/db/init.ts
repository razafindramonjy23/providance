import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'clickclick.db')
let db: Database.Database

export function getDB() {
  if (!db) {
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    initializeSchema()
  }
  return db
}

function initializeSchema() {
  const db = getDB()
  
  // Create users table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      level TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('superuser', 'admin', 'user')),
      createdAt TEXT NOT NULL
    );
  `)

  // Seed default users if table is empty
  const count = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }
  if (count.count === 0) {
    const defaults = [
      {
        id: 'su-001',
        email: 'superuser@clickclick.com',
        password: 'super123',
        name: 'Super Admin',
        level: 'Advanced',
        role: 'superuser',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'adm-001',
        email: 'admin@clickclick.com',
        password: 'admin123',
        name: 'Administrator',
        level: 'Advanced',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr-001',
        email: 'demo@clickclick.com',
        password: 'demo123',
        name: 'Demo User',
        level: 'Intermediate',
        role: 'user',
        createdAt: new Date().toISOString(),
      },
    ]

    const insert = db.prepare(`
      INSERT INTO users (id, email, password, name, level, role, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    for (const user of defaults) {
      insert.run(user.id, user.email, user.password, user.name, user.level, user.role, user.createdAt)
    }
  }
}
