import { getDB } from './init'

export type UserRole = 'superuser' | 'admin' | 'user'

export interface StoredUser {
  id: string
  email: string
  password: string
  name: string
  level: string
  role: UserRole
  createdAt: string
}

export interface User extends Omit<StoredUser, 'password'> {}

export function findUserByEmail(email: string): StoredUser | undefined {
  const db = getDB()
  const stmt = db.prepare('SELECT * FROM users WHERE email = ? LIMIT 1')
  return stmt.get(email) as StoredUser | undefined
}

export function findUserById(id: string): StoredUser | undefined {
  const db = getDB()
  const stmt = db.prepare('SELECT * FROM users WHERE id = ? LIMIT 1')
  return stmt.get(id) as StoredUser | undefined
}

export function getAllUsers(): StoredUser[] {
  const db = getDB()
  const stmt = db.prepare('SELECT * FROM users ORDER BY createdAt DESC')
  return stmt.all() as StoredUser[]
}

export function createUser(
  id: string,
  email: string,
  password: string,
  name: string,
  level: string,
  role: UserRole
): { ok: boolean; error?: string } {
  try {
    const db = getDB()
    const stmt = db.prepare(`
      INSERT INTO users (id, email, password, name, level, role, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    stmt.run(id, email, password, name, level, role, new Date().toISOString())
    return { ok: true }
  } catch (error: any) {
    return { ok: false, error: error.message }
  }
}

export function updateUser(
  id: string,
  updates: Partial<Omit<StoredUser, 'id' | 'createdAt'>>
): { ok: boolean; error?: string } {
  try {
    const db = getDB()
    const user = findUserById(id)
    if (!user) {
      return { ok: false, error: 'User not found' }
    }

    // Check if email is being changed and if it's already taken
    if (updates.email && updates.email !== user.email) {
      const existing = findUserByEmail(updates.email)
      if (existing) {
        return { ok: false, error: 'Email already in use' }
      }
    }

    const fields: string[] = []
    const values: any[] = []

    if (updates.email !== undefined) {
      fields.push('email = ?')
      values.push(updates.email)
    }
    if (updates.password !== undefined) {
      fields.push('password = ?')
      values.push(updates.password)
    }
    if (updates.name !== undefined) {
      fields.push('name = ?')
      values.push(updates.name)
    }
    if (updates.level !== undefined) {
      fields.push('level = ?')
      values.push(updates.level)
    }
    if (updates.role !== undefined) {
      fields.push('role = ?')
      values.push(updates.role)
    }

    if (fields.length === 0) {
      return { ok: true }
    }

    values.push(id)
    const stmt = db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`)
    stmt.run(...values)

    return { ok: true }
  } catch (error: any) {
    return { ok: false, error: error.message }
  }
}

export function deleteUser(id: string): { ok: boolean; error?: string } {
  try {
    const db = getDB()
    const user = findUserById(id)
    if (!user) {
      return { ok: false, error: 'User not found' }
    }

    const stmt = db.prepare('DELETE FROM users WHERE id = ?')
    stmt.run(id)

    return { ok: true }
  } catch (error: any) {
    return { ok: false, error: error.message }
  }
}
