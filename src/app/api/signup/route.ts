import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { appendToSheet, readSheet } from "@/utils/googleSheets"

const MIN_PASSWORD_LENGTH = 8

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long` },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const users = await readSheet('SIGNUPS')
    const existingUser = users.find((row: any) => row.Email === email)
    
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Add user to Google Sheet
    await appendToSheet('SIGNUPS', {
      Name: name,
      Email: email,
      Password: hashedPassword,
      Date: new Date().toISOString()
    })

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    )
  }
} 