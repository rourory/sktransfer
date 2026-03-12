import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { CategoryFormClient } from "@/components/admin/categories/category-form"

export default function NewCategoryPage() {
  return (
    <div>
      <Link href="/admin/categories" className="inline-flex items-center text-sm text-gray-500 hover:text-[var(--gold)] transition-colors cursor-pointer mb-6 font-medium">
        <ChevronLeft className="w-4 h-4 mr-1" /> Назад к списку
      </Link>
      <h1 className="text-3xl font-display font-semibold mb-6">Новая категория</h1>
      <CategoryFormClient />
    </div>
  )
}