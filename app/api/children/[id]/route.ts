import { type NextRequest, NextResponse } from "next/server"
import { getChildById, updateChild, deleteChild } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const child = await getChildById(id)
    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 })
    }
    return NextResponse.json(child)
  } catch (error) {
    console.error("Error fetching child:", error)
    return NextResponse.json({ error: "Failed to fetch child" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const childData = {
      ...body,
      age: Number(body.age) || 0,
      targetAmount: Number(body.targetAmount) || 0,
      currentAmount: Number(body.currentAmount) || 0,
    }

    const updatedChild = await updateChild(id, childData)
    if (!updatedChild) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 })
    }
    return NextResponse.json(updatedChild)
  } catch (error) {
    console.error("Error updating child:", error)
    return NextResponse.json(
      {
        error: "Failed to update child",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const success = await deleteChild(id)
    if (!success) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting child:", error)
    return NextResponse.json({ error: "Failed to delete child" }, { status: 500 })
  }
}
