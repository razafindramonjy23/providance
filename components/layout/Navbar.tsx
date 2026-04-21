'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut, ChevronDown, Shield, ShieldCheck } from 'lucide-react'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useAuth } from '@/lib/auth'

const levels = [
  { name: 'Beginner', href: '/dashboard/levels/beginner', color: '#4ade80', code: 'A1' },
  { name: 'Elementary', href: '/dashboard/levels/elementary', color: '#60a5fa', code: 'A2' },
  { name: 'Pre-Intermediate', href: '/dashboard/levels/pre-intermediate', color: '#a78bfa', code: 'B1-' },
  { name: 'Intermediate', href: '/dashboard/levels/intermediate', color: '#f59e0b', code: 'B1' },
  { name: 'Upper-Intermediate', href: '/dashboard/levels/upper-intermediate', color: '#f97316', code: 'B2' },
  { name: 'Advanced', href: '/dashboard/levels/advanced', color: '#ef4444', code: 'C1' },
]

const specialCourses = [
  { name: 'Aviation', href: '/dashboard/levels/aviation' },
  { name: 'Business', href: '/dashboard/levels/business' },
  { name: 'C1 Advanced (CAE)', href: '/dashboard/levels/cae' },
  { name: 'IELTS', href: '/dashboard/levels/ielts' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [levelsOpen, setLevelsOpen] = useState(false)
  const { user, logout } = useAuth()

  const isAdmin = user?.role === 'admin' || user?.role === 'superuser'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
              <span className="text-navy font-bold text-sm font-display">CC</span>
            </div>
            <span className="font-display font-bold text-xl text-[var(--text-primary)] group-hover:text-gold transition-colors">
              Click<span className="text-gold">-</span>Click
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-[var(--text-secondary)] hover:text-gold transition-colors">
              Accueil
            </Link>

            {/* Levels dropdown */}
            <div className="relative" onMouseEnter={() => setLevelsOpen(true)} onMouseLeave={() => setLevelsOpen(false)}>
              <button className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-gold transition-colors">
                Niveaux <ChevronDown size={14} className={`transition-transform ${levelsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {levelsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xl p-2"
                  >
                    <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      Niveaux généraux
                    </p>
                    <div className="grid grid-cols-1 gap-0.5">
                      {levels.map(l => (
                        <Link key={l.href} href={l.href}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-gold/10 hover:text-gold transition-colors"
                        >
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: l.color }} />
                          {l.name}
                          <span className="ml-auto text-xs font-mono opacity-50">{l.code}</span>
                        </Link>
                      ))}
                      <div className="gold-divider my-1" />
                      <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                        Cours spécialisés
                      </p>
                      {specialCourses.map(c => (
                        <Link key={c.href} href={c.href}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-gold/10 hover:text-gold transition-colors"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/dashboard/rules" className="text-sm text-[var(--text-secondary)] hover:text-gold transition-colors">
              Règles
            </Link>
            <Link href="/dashboard/contact" className="text-sm text-[var(--text-secondary)] hover:text-gold transition-colors">
              Contact
            </Link>

            {/* Admin link */}
            {isAdmin && (
              <Link href="/dashboard/admin"
                className="flex items-center gap-1.5 text-sm transition-colors font-medium"
                style={{ color: user?.role === 'superuser' ? '#c084fc' : 'rgb(173,145,45)' }}
              >
                {user?.role === 'superuser' ? <ShieldCheck size={14} /> : <Shield size={14} />}
                Admin
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user && (
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-[var(--text-muted)]">{user.level}</p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{user.name}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-[var(--text-muted)] hover:text-gold hover:bg-gold/10 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-gold transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--border)] bg-[var(--bg-card)]"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Niveaux</p>
              {levels.map(item => (
                <Link key={item.href} href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-gold transition-colors rounded-lg hover:bg-gold/10"
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  {item.name}
                  <span className="ml-auto text-xs font-mono opacity-50">{item.code}</span>
                </Link>
              ))}
              <div className="gold-divider my-2" />
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Spécialisés</p>
              {specialCourses.map(item => (
                <Link key={item.href} href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-gold transition-colors rounded-lg hover:bg-gold/10"
                >
                  {item.name}
                </Link>
              ))}
              <div className="gold-divider my-2" />
              <Link href="/dashboard/rules" onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-gold transition-colors rounded-lg hover:bg-gold/10">
                Règles
              </Link>
              <Link href="/dashboard/contact" onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-gold transition-colors rounded-lg hover:bg-gold/10">
                Contact
              </Link>
              {isAdmin && (
                <Link href="/dashboard/admin" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-gold/10 transition-colors"
                  style={{ color: user?.role === 'superuser' ? '#c084fc' : 'rgb(173,145,45)' }}>
                  {user?.role === 'superuser' ? <ShieldCheck size={14} /> : <Shield size={14} />}
                  Administration
                </Link>
              )}
              <div className="gold-divider my-2" />
              {user && (
                <button onClick={() => { logout(); setMobileOpen(false) }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut size={14} /> Déconnexion
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}