'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm font-medium mb-2" style={{ color: 'rgb(173,145,45)' }}>Nous contacter</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Entrez en contact
        </h1>
        <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
          Une question ? Besoin d'aide ? Notre équipe est là pour vous.
        </p>
      </motion.div>

      <div className="gold-divider mb-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Info */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-display text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            International House Johannesburg
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { icon: MapPin, label: 'Adresse', value: 'Johannesburg, South Africa', color: '#ef4444' },
              { icon: Phone, label: 'Téléphone', value: '+27 11 339-1051', color: '#60a5fa' },
              { icon: Mail, label: 'Email', value: 'info@ihjoburg.co.za', color: 'rgb(173,145,45)' },
              { icon: Clock, label: 'Heures', value: 'Lun–Ven : 8h–17h', color: '#4ade80' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}15` }}
                >
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          {sent ? (
            <div className="h-full flex items-center justify-center p-10 rounded-xl text-center"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(173,145,45,0.15)' }}
                >
                  <Send size={24} style={{ color: 'rgb(173,145,45)' }} />
                </div>
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Message envoyé !
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 rounded-xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <h3 className="font-display font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                Envoyez un message
              </h3>
              {[
                { label: 'Nom', key: 'name', type: 'text', placeholder: 'Votre nom' },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'votre@email.com' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as 'name' | 'email']}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    required
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Message</label>
                <textarea
                  rows={4}
                  placeholder="Votre message..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm"
                style={{ background: 'rgb(173,145,45)', color: 'rgb(20,41,71)' }}
              >
                <Send size={14} /> Envoyer le message
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
