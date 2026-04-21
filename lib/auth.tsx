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

export interface StoredUser extends User {
  password: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, level?: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  // Admin/Superuser methods
  getAllUsers: () => Promise<StoredUser[]>
  createUser: (name: string, email: string, password: string, role: UserRole, level: string) => Promise<{ ok: boolean; error?: string }>
  updateUser: (id: string, updates: Partial<Omit<StoredUser, 'id' | 'createdAt'>>) => Promise<boolean>
  deleteUser: (id: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | null>(null)

const SESSION_KEY = 'clickclick_session'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY)
      if (stored) setUser(JSON.parse(stored))
    } catch {}
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (data.ok && data.user) {
        setUser(data.user)
        localStorage.setItem(SESSION_KEY, JSON.stringify(data.user))
        setIsLoading(false)
        return true
      }
      setIsLoading(false)
      return false
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      return false
    }
  }

  const register = async (name: string, email: string, password: string, level = 'Beginner'): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, level }),
      })

      const data = await response.json()
      if (data.ok && data.user) {
        setUser(data.user)
        localStorage.setItem(SESSION_KEY, JSON.stringify(data.user))
        setIsLoading(false)
        return true
      }
      setIsLoading(false)
      return false
    } catch (error) {
      console.error('Register error:', error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
  }

  const getAllUsers = async (): Promise<StoredUser[]> => {
    try {
      const response = await fetch('/api/users/list')
      const data = await response.json()
      if (data.ok && data.users) {
        return data.users
      }
      return []
    } catch (error) {
      console.error('Get users error:', error)
      return []
    }
  }

  const createUser = async (
    name: string, email: string, password: string, role: UserRole, level: string
  ): Promise<{ ok: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/users/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, level }),
      })

      const data = await response.json()
      return data
    } catch (error: any) {
      return { ok: false, error: error.message }
    }
  }

  const updateUser = async (id: string, updates: Partial<Omit<StoredUser, 'id' | 'createdAt'>>): Promise<boolean> => {
    try {
      const response = await fetch('/api/users/manage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates }),
      })

      const data = await response.json()
      if (data.ok && user?.id === id) {
        // Refresh current session
        const refreshed = await fetch('/api/users/list')
        const listData = await refreshed.json()
        const updatedUser = listData.users?.find((u: User) => u.id === id)
        if (updatedUser) {
          setUser(updatedUser)
          localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser))
        }
      }
      return data.ok
    } catch (error) {
      console.error('Update user error:', error)
      return false
    }
  }

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/users/manage', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      const data = await response.json()
      return data.ok
    } catch (error) {
      console.error('Delete user error:', error)
      return false
    }
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