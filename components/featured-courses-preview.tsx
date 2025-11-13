"use client"

import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/products"
import { ArrowRight, Star } from "lucide-react"
import { encodeImageUrl } from "@/lib/utils/image-url"

export function FeaturedCoursesPreview() {
  // Get featured courses
  const featuredCourses = products
    .filter(p => p.category === "COURSES")
    .slice(0, 4)

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Courses</h2>
        <p className="text-sm text-muted-foreground">Popular courses picked just for you</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {featuredCourses.map((course) => (
          <Link 
            key={course.id} 
            href={`/product/${course.id}`}
            className="group relative block"
          >
            <div className="relative overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={course.image ? encodeImageUrl(course.image) : "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-3">
                <h3 className="font-semibold text-xs md:text-sm line-clamp-2 mb-2 min-h-[2.5rem]">
                  {course.title.replace(/Title: /g, '').substring(0, 60)}...
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{course.rating}</span>
                  </div>
                  <span className="text-sm font-bold text-primary">${course.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link 
          href="/courses" 
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          View all courses
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}


