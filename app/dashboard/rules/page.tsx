'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Monitor, Clock, Volume2, Users, AlertTriangle } from 'lucide-react'

const rules = [
  {
    icon: ShieldCheck,
    title: 'Accès Self-Access',
    color: '#4ade80',
    items: [
      'Connectez-vous avec vos identifiants personnels.',
      'Ne partagez jamais vos informations de connexion.',
      'Déconnectez-vous après chaque session.',
    ],
  },
  {
    icon: Monitor,
    title: 'Utilisation des ordinateurs',
    color: '#60a5fa',
    items: [
      'Utilisez les ordinateurs uniquement pour apprendre l\'anglais.',
      'Aucune installation de logiciels non autorisés.',
      'Signalez tout dysfonctionnement au responsable.',
    ],
  },
  {
    icon: Clock,
    title: 'Temps de session',
    color: '#f59e0b',
    items: [
      'La durée maximale par session est de 90 minutes.',
      'Libérez le poste si d\'autres étudiants attendent.',
      'Les sessions ne sont pas réservables à l\'avance.',
    ],
  },
  {
    icon: Volume2,
    title: 'Comportement en salle',
    color: '#a78bfa',
    items: [
      'Maintenez un environnement calme et studieux.',
      'Utilisez des écouteurs pour les exercices audio.',
      'Évitez les conversations prolongées.',
    ],
  },
  {
    icon: Users,
    title: 'Respect mutuel',
    color: '#34d399',
    items: [
      'Respectez les autres apprenants et le personnel.',
      'Ne dérangez pas les personnes en cours d\'exercice.',
      'Aidez les nouveaux apprenants si possible.',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Sanctions',
    color: '#f97316',
    items: [
      'Le non-respect des règles peut entraîner une suspension.',
      'Tout comportement inapproprié sera signalé.',
      'L\'accès peut être révoqué sans préavis.',
    ],
  },
]

export default function RulesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm font-medium mb-2" style={{ color: 'rgb(173,145,45)' }}>Règlement</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Règles du Self-Access
        </h1>
        <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
          Pour garantir un environnement d'apprentissage agréable et efficace pour tous, veuillez lire et respecter ces règles.
        </p>
      </motion.div>

      <div className="gold-divider mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rules.map((rule, i) => (
          <motion.div
            key={rule.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card-glow rounded-xl p-5"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${rule.color}15`, border: `1px solid ${rule.color}25` }}
              >
                <rule.icon size={18} style={{ color: rule.color }} />
              </div>
              <h3 className="font-display font-bold" style={{ color: 'var(--text-primary)' }}>{rule.title}</h3>
            </div>
            <ul className="flex flex-col gap-2">
              {rule.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: rule.color }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
