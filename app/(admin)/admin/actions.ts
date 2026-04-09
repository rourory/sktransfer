// app/admin/actions.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const password = formData.get("password");

  // Проверка пароля из .env
  if (password === process.env.ADMIN_PASSWORD) {
    // В Next.js 15 cookies() является Promise,  поэтому используем await
    const cookieStore = await cookies();

    // Устанавливаем куку на 7 дней
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    redirect("/admin");
  }

  return { error: "Неверный пароль" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

// --- CATEGORIES ---
export async function saveCategory(id: string | null, formData: FormData) {
  const data = {
    slug: formData.get("slug") as string,
    image: formData.get("image") as string,
    nameRu: formData.get("nameRu") as string,
    nameEn: formData.get("nameEn") as string,
    nameZh: formData.get("nameZh") as string,
    descriptionRu: formData.get("descriptionRu") as string,
    descriptionEn: formData.get("descriptionEn") as string,
    descriptionZh: formData.get("descriptionZh") as string,
    // НОВОЕ ПОЛЕ:
    showInFooter: formData.get("showInFooter") === "true",
  };

  if (id) {
    await prisma.category.update({ where: { id }, data });
  } else {
    await prisma.category.create({ data });
  }

  revalidatePath("/admin/categories");
  revalidatePath("/blog");
  revalidatePath("/"); // Сбрасываем кэш главной, так как там футер
  redirect("/admin/categories");
}

// --- ARTICLES ---
export async function saveArticle(id: string | null, formData: FormData) {
  const data = {
    slug: formData.get("slug") as string,
    categoryId: formData.get("categoryId") as string,
    coverImage: formData.get("coverImage") as string,
    images: formData.get("images") as string, // JSON string["url1", "url2"]

    // Основной контент
    titleRu: formData.get("titleRu") as string,
    titleEn: formData.get("titleEn") as string,
    titleZh: formData.get("titleZh") as string,

    contentRu: formData.get("contentRu") as string,
    contentEn: formData.get("contentEn") as string,
    contentZh: formData.get("contentZh") as string,

    excerptRu: formData.get("excerptRu") as string,
    excerptEn: formData.get("excerptEn") as string,
    excerptZh: formData.get("excerptZh") as string,

    // --- ДОБАВЛЕННЫЕ SEO ПОЛЯ ---
    metaTitleRu: (formData.get("metaTitleRu") as string) || null,
    metaTitleEn: (formData.get("metaTitleEn") as string) || null,
    metaTitleZh: (formData.get("metaTitleZh") as string) || null,

    metaDescriptionRu: (formData.get("metaDescriptionRu") as string) || null,
    metaDescriptionEn: (formData.get("metaDescriptionEn") as string) || null,
    metaDescriptionZh: (formData.get("metaDescriptionZh") as string) || null,

    isPublished: formData.get("isPublished") === "true",
  };

  if (id) {
    await prisma.article.update({ where: { id }, data });
  } else {
    await prisma.article.create({ data });
  }

  revalidatePath("/admin/articles");
  revalidatePath("/blog");
  // Также сбрасываем кэш конкретной статьи
  revalidatePath(`/blog/${data.categoryId}/${data.slug}`);

  redirect("/admin/articles");
}
export async function deleteCategory(id: string) {
  await prisma.category.delete({
    where: { id },
  });

  // Сбрасываем кэш, чтобы таблица и публичный блог обновились
  revalidatePath("/admin/categories");
  revalidatePath("/blog");
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({
    where: { id },
  });

  // Сбрасываем кэш
  revalidatePath("/admin/articles");
  revalidatePath("/blog");
}

// --- ЭКШЕНЫ ДЛЯ ТАРИФОВ ---
export async function saveTariff(id: string | null, formData: FormData) {
  const data = {
    key: formData.get("key") as string,
    pricePerKm: parseFloat(formData.get("pricePerKm") as string),
    imageUrl: formData.get("imageUrl") as string,
    isActive: formData.get("isActive") === "true",
    order: parseInt(formData.get("order") as string) || 0,
  };

  if (id) {
    await prisma.tariff.update({ where: { id }, data });
  } else {
    await prisma.tariff.create({ data });
  }

  revalidatePath("/admin/tariffs");
  redirect("/admin/tariffs");
}

export async function deleteTariff(id: string) {
  await prisma.tariff.delete({ where: { id } });
  revalidatePath("/admin/tariffs");
}

// --- ЭКШЕНЫ ДЛЯ МАРШРУТОВ ---
export async function saveRoute(id: string | null, formData: FormData) {
  const data = {
    slug: formData.get("slug") as string,
    fromSlug: formData.get("fromSlug") as string,
    toSlug: formData.get("toSlug") as string,
    
    distanceKm: parseFloat(formData.get("distanceKm") as string),
    durationMin: formData.get("durationMin") ? parseInt(formData.get("durationMin") as string) : null,
    
    fromLat: formData.get("fromLat") ? parseFloat(formData.get("fromLat") as string) : null,
    fromLon: formData.get("fromLon") ? parseFloat(formData.get("fromLon") as string) : null,
    toLat: formData.get("toLat") ? parseFloat(formData.get("toLat") as string) : null,
    toLon: formData.get("toLon") ? parseFloat(formData.get("toLon") as string) : null,

    fromNameRu: formData.get("fromNameRu") as string,
    fromNameEn: formData.get("fromNameEn") as string,
    fromNameZh: formData.get("fromNameZh") as string || null,
    toNameRu: formData.get("toNameRu") as string,
    toNameEn: formData.get("toNameEn") as string,
    toNameZh: formData.get("toNameZh") as string || null,

    additionalContentRu: formData.get("additionalContentRu") as string || null,
    additionalContentEn: formData.get("additionalContentEn") as string || null,
    additionalContentZh: formData.get("additionalContentZh") as string || null,

    isPopular: formData.get("isPopular") === "true",
    isAirport: formData.get("isAirport") === "true",
    isInternational: formData.get("isInternational") === "true",
  };

  if (id) {
    await prisma.transferRoute.update({ where: { id }, data });
  } else {
    await prisma.transferRoute.create({ data });
  }

  revalidatePath("/admin/routes");
  redirect("/admin/routes");
}

export async function deleteRoute(id: string) {
  await prisma.transferRoute.delete({ where: { id } });
  revalidatePath("/admin/routes");
}