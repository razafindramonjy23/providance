'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'superuser' | 'admin' | 'user'

export interface User {
  id: string
  email: string
  name: string
  level: string
  role: UserRole
  createdAt: string
}

interface StoredUser extends User {
  password: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, level?: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  // Admin/Superuser methods
  getAllUsers: () => StoredUser[]
  createUser: (name: string, email: string, password: string, role: UserRole, level: string) => Promise<{ ok: boolean; error?: string }>
  updateUser: (id: string, updates: Partial<Omit<StoredUser, 'id' | 'createdAt'>>) => Promise<boolean>
  deleteUser: (id: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | null>(null)

const STORAGE_KEY = 'clickclick_users_db'
const SESSION_KEY = 'clickclick_session'

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function getDB(): StoredUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  // Seed default users on first load
  const defaults: StoredUser[] = [
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults))
  return defaults
}

function saveDB(users: StoredUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY)
      if (stored) setUser(JSON.parse(stored))
      // Ensure DB is seeded
      getDB()
    } catch {}
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const db = getDB()
    const found = db.find(u => u.email === email && u.password === password)
    if (found) {
      const { password: _, ...userData } = found
      setUser(userData)
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData))
      setIsLoading(false)
      return true
    }
    setIsLoading(false)
    return false
  }

  const register = async (name: string, email: string, password: string, level = 'Beginner'): Promise<boolean> => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const db = getDB()
    if (db.find(u => u.email === email)) {
      setIsLoading(false)
      return false // email already taken
    }
    const newUser: StoredUser = {
      id: generateId(),
      email, name, password,
      level,
      role: 'user',
      createdAt: new Date().toISOString(),
    }
    db.push(newUser)
    saveDB(db)
    const { password: _, ...userData } = newUser
    setUser(userData)
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
  }

  const getAllUsers = (): StoredUser[] => {
    return getDB()
  }

  const createUser = async (
    name: string, email: string, password: string, role: UserRole, level: string
  ): Promise<{ ok: boolean; error?: string }> => {
    const db = getDB()
    if (db.find(u => u.email === email)) {
      return { ok: false, error: 'Cet email est déjà utilisé.' }
    }
    const newUser: StoredUser = {
      id: generateId(),
      email, name, password, role, level,
      createdAt: new Date().toISOString(),
    }
    db.push(newUser)
    saveDB(db)
    return { ok: true }
  }

  const updateUser = async (id: string, updates: Partial<Omit<StoredUser, 'id' | 'createdAt'>>): Promise<boolean> => {
    const db = getDB()
    const idx = db.findIndex(u => u.id === id)
    if (idx === -1) return false
    // Superuser role can only be changed by superuser
    db[idx] = { ...db[idx], ...updates }
    saveDB(db)
    // Refresh current session if it's the same user
    if (user?.id === id) {
      const { password: _, ...userData } = db[idx]
      setUser(userData)
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData))
    }
    return true
  }

  const deleteUser = async (id: string): Promise<boolean> => {
    const db = getDB()
    const filtered = db.filter(u => u.id !== id)
    if (filtered.length === db.length) return false
    saveDB(filtered)
    return true
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, getAllUsers, createUser, updateUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}