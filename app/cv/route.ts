import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { NextResponse } from "next/server";

const CV_FILENAME = "nabin-dhungana-cv.pdf";
const CV_FALLBACK_FILENAME = "Nabin-Dhungana-CV.pdf";

export async function GET() {
  const filePath = join(process.cwd(), "public", "cv", CV_FILENAME);

  try {
    const content = await readFile(filePath);
    return new NextResponse(new Uint8Array(content), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${CV_FALLBACK_FILENAME}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("CV not found.", { status: 404 });
  }
}
