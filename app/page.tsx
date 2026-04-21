'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user is logged in
    try {
      const stored = localStorage.getItem('clickclick_user')
      if (stored) {
        router.replace('/dashboard')
      } else {
        router.replace('/auth')
      }
    } catch {
      router.replace('/auth')
    }
  }, [router])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
    </div>
  )
}
