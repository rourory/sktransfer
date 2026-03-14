// app/api/upload/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import sharp from "sharp";

const IMAGE_QUALITY = 80;
const MAX_IMAGE_WIDTH = 1920;
const MAX_IMAGE_HEIGHT = 1920;

async function compressImage(
  buffer: Buffer,
): Promise<{ buffer: Buffer; filename: string }> {
  try {
    let sharpInstance = sharp(buffer);
    const metadata = await sharpInstance.metadata();

    if (metadata.width && metadata.height) {
      if (
        metadata.width > MAX_IMAGE_WIDTH ||
        metadata.height > MAX_IMAGE_HEIGHT
      ) {
        sharpInstance = sharpInstance.resize(
          MAX_IMAGE_WIDTH,
          MAX_IMAGE_HEIGHT,
          {
            fit: "inside",
            withoutEnlargement: true,
          },
        );
      }
    }

    const compressedBuffer = await sharpInstance
      .webp({ quality: IMAGE_QUALITY, effort: 4 })
      .toBuffer();

    return { buffer: compressedBuffer, filename: ".webp" };
  } catch (error) {
    console.error("Ошибка компрессии:", error);
    return { buffer, filename: ".webp" };
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
    }

    const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    if (!imageTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Неподдерживаемый тип. Разрешены: JPEG, PNG, WebP, GIF" },
        { status: 400 },
      );
    }

    const timestamp = Date.now();
    const originalName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .replace(/\.[^.]+$/, "");

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    let buffer: Buffer = Buffer.from(bytes);
    let finalFilename: string;

    if (file.type !== "image/gif") {
      const compressed = await compressImage(buffer);
      buffer = compressed.buffer;
      finalFilename = `${timestamp}-${originalName}${compressed.filename}`;
    } else {
      finalFilename = `${timestamp}-${originalName}.gif`;
    }

    const filePath = path.join(uploadsDir, finalFilename);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      url: `/uploads/${finalFilename}`,
      filename: finalFilename,
    });
  } catch (error) {
    console.error("Ошибка загрузки:", error);
    return NextResponse.json(
      { error: "Ошибка при загрузке файла" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || !url.startsWith("/uploads/")) {
      return NextResponse.json(
        { error: "Неверный URL файла" },
        { status: 400 },
      );
    }

    const filename = url.replace("/uploads/", "");
    const filePath = path.join(process.cwd(), "public", "uploads", filename);

    try {
      await unlink(filePath);
    } catch (err) {
      console.log("Файл уже удален или не найден:", filePath);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при удалении" }, { status: 500 });
  }
}
