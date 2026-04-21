import { NextRequest, NextResponse } from 'next/server'
import { getAllUsers, User } from '@/lib/db/queries'

export async function GET(request: NextRequest) {
  try {
    const users = getAllUsers()
    const withoutPasswords = users.map(({ password: _, ...user }) => user as User)
    return NextResponse.json({ ok: true, users: withoutPasswords })
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    )
  }
}
