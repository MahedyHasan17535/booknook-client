"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";

const slides = [
  {
    eyebrow: "Welcome to BookNook",
    title: "A small library with a very big heart",
    text: "Browse stories shared by readers like you and take your next favourite book home today.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1800&q=80",
  },
  {
    eyebrow: "Borrow with ease",
    title: "Pick a book, borrow it, enjoy it for a week",
    text: "Borrowing takes one click. Keep the book for seven days and return it when you are done.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1800&q=80",
  },
  {
    eyebrow: "Share your shelf",
    title: "Add your own books and let others read them",
    text: "Have a book that is collecting dust? Add it to BookNook and let the community enjoy it.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1800&q=80",
  },
];

export function Banner() {
  return (
    <section>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        style={{ "--swiper-pagination-color": "#ffffff" } as React.CSSProperties}
        className="h-[70vh] min-h-[480px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title} className="relative bg-stone-900">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-black/20" />

            <div className="relative mx-auto flex h-full max-w-7xl items-center px-6">
              <div className="max-w-2xl text-white">
                <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
                  {slide.eyebrow}
                </p>
                <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-white/85">
                  {slide.text}
                </p>
                <Button
                  size="lg"
                  className="mt-8 rounded-full px-8"
                  render={<Link href="/books" />}
                  nativeButton={false}
                >
                  Browse Books
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
