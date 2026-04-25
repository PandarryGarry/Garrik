import { NextResponse } from "next/server";
import { JsonPostRepository } from "@core/storage/json-storage";
import { validatePost } from "@core/services/validation";

const repo = new JsonPostRepository();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = validatePost(body);
    const result = await repo.save(validated);

    return NextResponse.json({ success: true, slug: result.slug }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

