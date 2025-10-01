import { NextResponse } from "next/server";
import { getcasas } from "@/service/casas.service";

export async function POST(req) {
  try {
    const { v_nombre } = await req.json();               
    if (!v_nombre?.trim()) {
      return NextResponse.json({ error: "Falta v_nombre" }, { status: 400 });
    }

    const result = await getcasas(v_nombre.trim());      
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("POST /api/casas:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
