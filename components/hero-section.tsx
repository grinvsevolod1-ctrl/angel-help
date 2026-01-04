"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Users, Gift, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative bg-gradient-to-b from-secondary to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20">
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6 animate-in">
            Привычка <span className="text-gradient">Дарить Добро</span>
          </h1>

          <p
            className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 animate-in"
            style={{ animationDelay: "100ms" }}
          >
            Помогайте детям регулярно — ежедневно, еженедельно или ежемесячно
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-in"
            style={{ animationDelay: "200ms" }}
          >
            <Button
              size="lg"
              className="h-14 px-8 text-base font-semibold rounded-full bg-primary hover:bg-primary/90 press-effect touch-target"
              asChild
            >
              <Link href="#donate">
                <Heart className="h-5 w-5 mr-2" />
                Помочь сейчас
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base font-semibold rounded-full border-2 press-effect touch-target bg-transparent"
              asChild
            >
              <Link href="#children">
                Кому помочь
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative max-w-4xl mx-auto animate-in" style={{ animationDelay: "300ms" }}>
          <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-elevated">
            <Image
              src="/happy-diverse-children-smiling-together-with-chari.jpg"
              alt="Дети нуждающиеся в помощи"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Floating CTA on image */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base font-semibold rounded-full bg-white text-foreground hover:bg-white/90 shadow-lg press-effect touch-target"
                asChild
              >
                <Link href="#donate">
                  Стать благотворителем
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8 max-w-lg mx-auto animate-in"
          style={{ animationDelay: "400ms" }}
        >
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-soft text-center press-effect">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Gift className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">250+</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Дарителей</p>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-soft text-center press-effect">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">1000+</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Детям помогли</p>
          </div>
        </div>
      </div>
    </section>
  )
}
