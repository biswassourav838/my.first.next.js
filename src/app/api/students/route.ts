import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const students = await prisma.student.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json(students);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.firstName || !body.lastName || !body.email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const student = await prisma.student.create({ data: body });
  return NextResponse.json(student, { status: 201 });
}
