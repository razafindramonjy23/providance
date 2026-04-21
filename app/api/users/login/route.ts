import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail, findUserById, User } from '@/lib/db/queries'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = findUserByEmail(email)
    if (!user || user.password !== password) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ ok: true, user: userWithoutPassword as User })
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    )
  }
}
