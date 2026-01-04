import { type NextRequest, NextResponse } from "next/server"
import { getChildren, createChild } from "@/lib/db"

export async function GET() {
  try {
    const children = await getChildren()
    return NextResponse.json(children)
  } catch (error) {
    console.error("[v0] Error fetching children:", error)
    return NextResponse.json({ error: "Failed to fetch children" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Received POST request with body:", body)

    if (!body.name || !body.diagnosis || !body.story) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const childData = {
      ...body,
      age: Number(body.age) || 0,
      targetAmount: Number(body.targetAmount) || 0,
      currentAmount: Number(body.currentAmount) || 0,
    }

    const newChild = await createChild(childData)
    console.log("[v0] Child created via API:", newChild)
    return NextResponse.json(newChild, { status: 201 })
  } catch (error) {
    console.error("[v0] Error in POST /api/children:", error)
    return NextResponse.json(
      {
        error: "Failed to create child",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
