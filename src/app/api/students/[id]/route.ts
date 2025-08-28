import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const student = await prisma.student.findUnique({ where: { id: Number(params.id) } });
  return NextResponse.json(student);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const student = await prisma.student.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(student);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await prisma.student.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ ok: true });
}
