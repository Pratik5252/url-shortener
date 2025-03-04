//Demo route

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const userId = req.headers.get("x-user-id");
  const { longUrl } = await req.json();

  return NextResponse.json({ success: true, data: { longUrl } });
}
