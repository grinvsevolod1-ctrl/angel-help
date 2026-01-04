import { type NextRequest, NextResponse } from "next/server"
import { getProgramById, updateProgram, deleteProgram } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const program = await getProgramById(id)

    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 })
    }

    return NextResponse.json(program)
  } catch (error) {
    console.error("Error fetching program:", error)
    return NextResponse.json({ error: "Failed to fetch program" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const updated = await updateProgram(id, body)

    if (!updated) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating program:", error)
    return NextResponse.json({ error: "Failed to update program" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const deleted = await deleteProgram(id)

    if (!deleted) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting program:", error)
    return NextResponse.json({ error: "Failed to delete program" }, { status: 500 })
  }
}
