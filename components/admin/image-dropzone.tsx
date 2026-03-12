// app/admin/components/image-dropzone.client.tsx
"use client"

import { useState, useRef } from "react"
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react"

interface ImageDropzoneProps {
  value: string
  onChange: (url: string) => void
}

export function ImageDropzone({ value, onChange }: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const[error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      setError("Только картинки (JPG, PNG, WebP, GIF)")
      return
    }

    setIsUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Ошибка при загрузке")
      
      const data = await res.json()
      onChange(data.url) // Передаем URL картинки наверх
    } catch (err) {
      setError("Не удалось загрузить изображение")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = async () => {
    // Опционально: физически удаляем с сервера при нажатии на крестик
    if (value.startsWith("/uploads/")) {
      try {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: value }),
        })
      } catch (e) {
        console.error("Ошибка при удалении", e)
      }
    }
    onChange("") // Очищаем форму
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Если картинка уже загружена — показываем её
  if (value) {
    return (
      <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 group">
        <img src={value} alt="Preview" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            type="button"
            onClick={handleRemove}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Зона для перетаскивания
  return (
    <div>
      <div
        className={`relative w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 transition-all cursor-pointer overflow-hidden ${
          isDragging 
            ? "border-[var(--gold)] bg-amber-50" 
            : "border-gray-300 hover:border-[var(--gold)] hover:bg-gray-50 bg-white"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          const file = e.dataTransfer.files?.[0]
          if (file) handleUpload(file)
        }}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleUpload(file)
          }}
        />

        {isUploading ? (
          <div className="flex flex-col items-center text-[var(--gold)]">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <span className="text-sm font-medium">Загрузка и сжатие...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <UploadCloud className={`w-10 h-10 mb-3 transition-colors ${isDragging ? "text-[var(--gold)]" : "text-gray-400"}`} />
            <p className="text-sm font-medium text-gray-700 mb-1">
              Нажмите или перетащите картинку
            </p>
            <p className="text-xs text-gray-400 text-center max-w-xs">
              JPEG, PNG, WebP (автоматически конвертируется в WebP для ускорения сайта)
            </p>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
    </div>
  )
}