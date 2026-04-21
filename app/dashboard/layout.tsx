'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthProvider, useAuth } from '@/lib/auth'
import { Navbar } from '@/components/layout/Navbar'

function DashboardInner({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace('/auth')
      }
      setChecked(true)
    }
  }, [user, isLoading, router])

  // Show loader while checking auth
  if (!checked || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[rgba(173,145,45,0.3)] border-t-[rgb(173,145,45)] rounded-full animate-spin" />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Chargement…</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />
      <main className="pt-16">{children}</main>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardInner>{children}</DashboardInner>
    </AuthProvider>
  )
}
