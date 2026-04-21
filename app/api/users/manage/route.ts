import { NextRequest, NextResponse } from 'next/server'
import { createUser, updateUser as updateUserDB, deleteUser as deleteUserDB, User, UserRole } from '@/lib/db/queries'

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

// Create user (admin/superuser only)
export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role, level } = await request.json()

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const id = generateId()
    const result = createUser(id, email, password, name, level || 'Beginner', role as UserRole)

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
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
        role,
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

// Update user
export async function PUT(request: NextRequest) {
  try {
    const { id, updates } = await request.json()

    if (!id) {
      return NextResponse.json(
        { ok: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    const result = updateUserDB(id, updates)

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    )
  }
}

// Delete user
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { ok: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    const result = deleteUserDB(id)

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    )
  }
}
