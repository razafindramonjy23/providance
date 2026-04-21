'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Trophy, Target, Zap, ArrowRight, Globe, Briefcase, Plane, GraduationCap } from 'lucide-react'
import { useAuth } from '@/lib/auth'

const levels = [
  { name: 'Beginner', code: 'A1', color: '#4ade80', desc: 'Pour les débutants complets', href: '/dashboard/levels/beginner', count: 45 },
  { name: 'Elementary', code: 'A2', color: '#60a5fa', desc: 'Bases solides de l\'anglais', href: '/dashboard/levels/elementary', count: 62 },
  { name: 'Pre-Intermediate', code: 'B1-', color: '#a78bfa', desc: 'Développez votre vocabulaire', href: '/dashboard/levels/pre-intermediate', count: 78 },
  { name: 'Intermediate', code: 'B1', color: '#f59e0b', desc: 'Communiquez avec confiance', href: '/dashboard/levels/intermediate', count: 91 },
  { name: 'Upper-Intermediate', code: 'B2', color: '#f97316', desc: 'Maîtrisez les nuances', href: '/dashboard/levels/upper-intermediate', count: 84 },
  { name: 'Advanced', code: 'C1', color: '#ef4444', desc: 'Perfectionnez votre anglais', href: '/dashboard/levels/advanced', count: 67 },
]

const specialCourses = [
  { name: 'Aviation English', icon: Plane, color: '#38bdf8', desc: 'Phraséologie et communications aériennes', href: '/dashboard/levels/aviation' },
  { name: 'Business English', icon: Briefcase, color: '#34d399', desc: 'Anglais professionnel et commercial', href: '/dashboard/levels/business' },
  { name: 'C1 Advanced (CAE)', icon: GraduationCap, color: '#c084fc', desc: 'Préparation à la certification Cambridge', href: '/dashboard/levels/cae' },
  { name: 'IELTS Preparation', icon: Globe, color: 'rgb(173,145,45)', desc: 'Atteignez le score IELTS visé', href: '/dashboard/levels/ielts' },
]

const stats = [
  { label: 'Exercices', value: '500+', icon: Zap },
  { label: 'Niveaux', value: '6', icon: Target },
  { label: 'Cours spéciaux', value: '4', icon: BookOpen },
  { label: 'Certifications', value: '2', icon: Trophy },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function DashboardHome() {
  const { user } = useAuth()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14 relative"
      >
        <div className="absolute -top-4 -left-4 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(173,145,45,0.08) 0%, transparent 70%)' }}
        />
        <p className="text-sm font-medium mb-3" style={{ color: 'rgb(173,145,45)' }}>
          Bienvenue, {user?.name} 👋
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
          Pratiquez votre<br />
          <span className="shimmer-text">anglais en ligne.</span>
        </h1>
        <p className="text-lg max-w-xl" style={{ color: 'var(--text-secondary)' }}>
          Explorez des exercices, tests et jeux pour tous les niveaux. Choisissez votre parcours et commencez à progresser dès maintenant.
        </p>

        <div className="flex gap-3 mt-6">
          <Link href="/dashboard/levels/beginner">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
              style={{ background: 'rgb(173,145,45)', color: 'rgb(20,41,71)' }}
            >
              Commencer <ArrowRight size={15} />
            </motion.button>
          </Link>
          <Link href="/dashboard/rules">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              Voir les règles
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {stats.map(s => (
          <motion.div key={s.label} variants={item}
            className="card-glow rounded-xl p-4 flex items-center gap-3"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(173,145,45,0.15)' }}
            >
              <s.icon size={18} style={{ color: 'rgb(173,145,45)' }} />
            </div>
            <div>
              <p className="font-bold text-xl font-display" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Levels */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Niveaux généraux
          </h2>
          <Link href="/dashboard/levels" className="text-sm flex items-center gap-1 hover:text-gold transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {levels.map(level => (
            <motion.div key={level.name} variants={item}>
              <Link href={level.href}>
                <div className="card-glow rounded-xl p-5 h-full cursor-pointer group"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono"
                      style={{ background: `${level.color}18`, color: level.color, border: `1px solid ${level.color}30` }}
                    >
                      {level.code}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{level.count} exercices</span>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1 group-hover:text-gold transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {level.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{level.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium"
                    style={{ color: level.color }}
                  >
                    Explorer <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Special courses */}
      <div>
        <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Cours spécialisés
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {specialCourses.map(course => (
            <motion.div key={course.name} variants={item}>
              <Link href={course.href}>
                <div className="card-glow rounded-xl p-5 cursor-pointer group flex items-center gap-4"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${course.color}15`, border: `1px solid ${course.color}25` }}
                  >
                    <course.icon size={22} style={{ color: course.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold mb-0.5 group-hover:text-gold transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {course.name}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{course.desc}</p>
                  </div>
                  <ArrowRight size={16} style={{ color: 'var(--text-muted)' }}
                    className="group-hover:translate-x-1 group-hover:text-gold transition-all flex-shrink-0"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 text-center" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          © 2026 Providence Academy Madagascar
        </p>
      </div>
    </div>
  )
}
