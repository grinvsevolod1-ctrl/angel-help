"use client"

import { useState, useEffect, useCallback } from "react"
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    parent: "Мама Вязниковой Лизы",
    text: "Благодарим фонд за оперативную помощь и поддержку в трудный момент",
    image: "/images/testimonials/vyaznikova.jpg",
    videoId: "CtF1iTcOJPk", // Только ID видео для встроенного плеера
  },
  {
    id: 2,
    parent: "Мама Смирнова Глеба",
    text: "Спасибо всем, кто помог нашему сыну получить необходимое лечение",
    image: "/images/testimonials/smirnov.jpg",
    videoId: "6TDBZQyFrnk", // Только ID видео для встроенного плеера
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVideoOpen, setIsVideoOpen] = useState(false) // Состояние модального окна видео
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null) // ID текущего видео

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, next])

  const handleInteraction = (action: () => void) => {
    setIsAutoPlaying(false)
    action()
  }

  const openVideo = (videoId: string) => {
    setCurrentVideoId(videoId)
    setIsVideoOpen(true)
    setIsAutoPlaying(false)
  }

  const closeVideo = () => {
    setIsVideoOpen(false)
    setCurrentVideoId(null)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo()
    }
    if (isVideoOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isVideoOpen])

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-xs md:text-sm font-medium text-primary uppercase tracking-widest mb-3 block">
            Отзывы
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">Слова благодарности</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Основное изображение */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[16/9] bg-gray-100">
              <Image
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].parent}
                fill
                className="object-cover"
              />

              {/* Градиент */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Контент внизу */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="text-white">
                    <p className="text-sm md:text-base opacity-80 mb-1">{testimonials[currentIndex].parent}</p>
                    <p className="text-base md:text-lg lg:text-xl font-medium leading-snug">
                      {testimonials[currentIndex].text}
                    </p>
                  </div>

                  {testimonials[currentIndex].videoId && (
                    <button
                      onClick={() => openVideo(testimonials[currentIndex].videoId)}
                      className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-5 py-3 rounded-full hover:bg-white/30 transition-all hover:scale-105 min-h-[48px] whitespace-nowrap"
                    >
                      <Play className="w-5 h-5 fill-white" />
                      <span className="text-sm font-medium">Смотреть</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Навигация */}
            <button
              onClick={() => handleInteraction(prev)}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              aria-label="Предыдущий"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
            <button
              onClick={() => handleInteraction(next)}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              aria-label="Следующий"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
          </div>

          {/* Индикаторы */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleInteraction(() => setCurrentIndex(index))}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-primary" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Слайд ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {isVideoOpen && currentVideoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-5xl aspect-video animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
              aria-label="Закрыть видео"
            >
              <X className="w-6 h-6" />
            </button>

            {/* YouTube iframe с поддержкой shorts */}
            <iframe
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  )
}
