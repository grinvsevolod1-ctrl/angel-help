import { type NextRequest, NextResponse } from "next/server"
import { getPrograms, createProgram } from "@/lib/db"

export async function GET() {
  try {
    const programs = await getPrograms()
    return NextResponse.json(programs)
  } catch (error) {
    console.error("Error fetching programs:", error)
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.slug || !body.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newProgram = await createProgram(body)
    return NextResponse.json(newProgram, { status: 201 })
  } catch (error) {
    console.error("Error creating program:", error)
    return NextResponse.json({ error: "Failed to create program" }, { status: 500 })
  }
}
