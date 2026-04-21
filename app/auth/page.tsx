'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, ChevronRight } from 'lucide-react'
import { useAuth, AuthProvider } from '@/lib/auth'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

function AuthPageInner() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    let ok = false
    if (mode === 'login') {
      ok = await login(email, password)
      if (!ok) setError('Email ou mot de passe incorrect.')
    } else {
      if (!name.trim()) { setError('Veuillez entrer votre nom.'); setLoading(false); return }
      ok = await register(name, email, password)
      if (!ok) setError('Erreur lors de la création du compte.')
    }

    if (ok) router.push('/dashboard')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Left panel – decorative */}
      <div className="hidden lg:flex flex-col justify-between w-[55%] relative overflow-hidden"
        style={{ background: 'rgb(20, 41, 71)' }}
      >
        {/* Grid bg */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Glowing orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(173,145,45,0.15) 0%, transparent 70%)' }}
        />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(173,145,45,0.08) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 p-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center">
              <span className="text-navy font-bold font-display">CC</span>
            </div>
            <span className="font-display text-2xl font-bold text-white">Click-Click</span>
          </div>
        </div>

        <div className="relative z-10 px-12 py-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <h1 className="font-display text-5xl font-bold text-white leading-tight mb-6">
              Maîtrisez<br />
              <span className="shimmer-text">l'anglais</span><br />
              à votre rythme.
            </h1>
            <p className="text-blue-200/70 text-lg leading-relaxed max-w-sm">
              Exercices interactifs, tests et jeux pour tous les niveaux. Aviation, IELTS, Business — trouvez votre parcours.
            </p>
          </motion.div>

          {/* Level badges */}
          <motion.div
            className="mt-10 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {['A1', 'A2', 'B1', 'B2', 'C1', 'IELTS', 'Aviation'].map((l, i) => (
              <motion.span
                key={l}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.07 }}
                className="px-3 py-1 rounded-full text-sm font-medium border"
                style={{ borderColor: 'rgba(173,145,45,0.4)', color: 'rgb(173,145,45)', background: 'rgba(173,145,45,0.08)' }}
              >
                {l}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 p-12">
          <p className="text-blue-200/40 text-xs">
            © 2026 International House Johannesburg
          </p>
        </div>
      </div>

      {/* Right panel – form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
        {/* Theme toggle top-right */}
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
              <span className="text-navy font-bold text-sm font-display">CC</span>
            </div>
            <span className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Click-Click
            </span>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl p-1 mb-8 gap-1"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          >
            {(['login', 'register'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { setMode(tab); setError('') }}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative"
                style={{ color: mode === tab ? 'rgb(20,41,71)' : 'var(--text-muted)' }}
              >
                {mode === tab && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-lg bg-gold"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === 'login' ? 'Connexion' : 'Inscription'}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AnimatePresence>
              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                    Nom complet
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Jean Dupont"
                      className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Adresse email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  required
                  className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Mot de passe
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-10 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 bg-red-500/10 border border-red-500/20"
                >
                  <AlertCircle size={14} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all mt-2 disabled:opacity-60"
              style={{ background: 'rgb(173,145,45)', color: 'rgb(20,41,71)' }}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
                  <ChevronRight size={16} />
                </>
              )}
            </motion.button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-4 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Compte démo :</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              📧 <span className="font-mono">demo@clickclick.com</span>
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              🔑 <span className="font-mono">demo123</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <AuthProvider>
      <AuthPageInner />
    </AuthProvider>
  )
}
