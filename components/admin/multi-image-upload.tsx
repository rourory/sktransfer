"use client";

import { useState, useRef, useEffect } from "react";
import { UploadCloud, Loader2, Trash2, Image as ImageIcon } from "lucide-react";

interface MultiImageUploadProps {
  value: string; // JSON строка: '["url1", "url2"]'
  onChange: (value: string) => void;
  label?: string;
}

export function MultiImageUpload({
  value,
  onChange,
  label = "Галерея изображений",
}: MultiImageUploadProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Парсим входящую JSON-строку при загрузке компонента
  useEffect(() => {
    try {
      if (value && value !== "[]") {
        setImages(JSON.parse(value));
      } else {
        setImages([]);
      }
    } catch (e) {
      console.error("Ошибка парсинга картинок", e);
      setImages([]);
    }
  }, [value]);

  const updateParent = (newImages: string[]) => {
    setImages(newImages);
    onChange(JSON.stringify(newImages));
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError("");

    const newUploadedUrls: string[] = [];

    try {
      // Загружаем файлы по очереди (или можно через Promise.all)
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (
          !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
            file.type,
          )
        ) {
          setError(`Файл ${file.name} не является поддерживаемой картинкой.`);
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Ошибка при загрузке сервера");

        const data = await res.json();
        newUploadedUrls.push(data.url);
      }

      // Добавляем новые картинки к уже существующим
      updateParent([...images, ...newUploadedUrls]);
    } catch (err) {
      setError("Произошла ошибка при загрузке некоторых изображений.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = async (indexToRemove: number, urlToRemove: string) => {
    // Удаляем из стейта
    const newImages = images.filter((_, idx) => idx !== indexToRemove);
    updateParent(newImages);

    // Опционально: удаляем физически с сервера
    if (urlToRemove.startsWith("/uploads/")) {
      try {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: urlToRemove }),
        });
      } catch (e) {
        console.error("Ошибка удаления с сервера", e);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <span className="text-xs font-medium bg-amber-50 text-[var(--gold)] px-2 py-1 rounded-full">
          Загружено: {images.length}
        </span>
      </div>

      {/* Сетка уже загруженных картинок */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
          {images.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group bg-gray-50 shadow-sm"
            >
              <img
                src={url}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Бейдж с плейсхолдером (подсказка для редактора) */}
              <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white text-xs font-mono px-2 py-1 rounded shadow-sm border border-white/20">
                {`{${index}}`}
              </div>

              {/* Кнопка удаления (появляется при наведении) */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleRemove(index, url)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg cursor-pointer transform hover:scale-110"
                  title="Удалить картинку"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Зона Drag & Drop для новых картинок */}
      <div>
        <div
          className={`relative w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 transition-all cursor-pointer overflow-hidden ${
            isDragging
              ? "border-[var(--gold)] bg-amber-50"
              : "border-gray-300 hover:border-[var(--gold)] hover:bg-gray-50 bg-white"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleUpload(e.dataTransfer.files);
          }}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          {/* Input с multiple атрибутом позволяет выбирать сразу несколько файлов */}
          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => handleUpload(e.target.files)}
          />

          {isUploading ? (
            <div className="flex flex-col items-center text-[var(--gold)]">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <span className="text-sm font-medium">
                Загрузка и оптимизация...
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <UploadCloud
                className={`w-10 h-10 mb-3 transition-colors ${isDragging ? "text-[var(--gold)]" : "text-gray-400"}`}
              />
              <p className="text-sm font-medium text-gray-700 mb-1 text-center">
                Нажмите или перетащите картинки сюда
              </p>
              <p className="text-xs text-gray-400 text-center max-w-xs mt-1">
                Можно выбрать сразу несколько файлов. JPG, PNG, WebP
              </p>
            </div>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}
