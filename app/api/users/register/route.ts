import { NextRequest, NextResponse } from 'next/server'
import { createUser, User } from '@/lib/db/queries'

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, level } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { ok: false, error: 'Name, email and password are required' },
        { status: 400 }
      )
    }

    const id = generateId()
    const result = createUser(id, email, password, name, level || 'Beginner', 'user')

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error || 'Failed to create user' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      ok: true,
      user: {
        id,
        email,
        name,
        level: level || 'Beginner',
        role: 'user',
        createdAt: new Date().toISOString(),
      } as User,
    })
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    )
  }
}
