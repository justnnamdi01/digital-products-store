"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { encodeImageUrl } from "@/lib/utils/image-url"
import { Product } from "@/lib/products"
import { getProductImages } from "@/lib/utils/product-images"

interface ProductImageGalleryProps {
  product: Product
  autoRotateInterval?: number // in milliseconds, default 2000 (2 seconds)
}

export function ProductImageGallery({ product, autoRotateInterval = 2000 }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [validImages, setValidImages] = useState<string[]>([])

  // Get all product images and validate them
  useEffect(() => {
    const productImages = getProductImages(product)
    setImages(productImages)
    // Start with the first image (which we know exists)
    setValidImages([product.image].filter(Boolean))
    
    // Try to load additional images
    const checkImages = async () => {
      const valid: string[] = [product.image].filter(Boolean)
      
      for (let i = 1; i < productImages.length; i++) {
        const img = new window.Image()
        const imageUrl = encodeImageUrl(productImages[i])
        
        try {
          await new Promise((resolve, reject) => {
            img.onload = () => resolve(true)
            img.onerror = () => reject(false)
            img.src = imageUrl
            // Timeout after 2 seconds
            setTimeout(() => reject(false), 2000)
          })
          valid.push(productImages[i])
        } catch {
          // Image doesn't exist, stop checking
          break
        }
      }
      
      setValidImages(valid)
    }
    
    checkImages()
  }, [product])

  // Auto-rotate images
  useEffect(() => {
    if (validImages.length <= 1 || isModalOpen) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [validImages.length, autoRotateInterval, isModalOpen])

  // Preload next image
  useEffect(() => {
    if (validImages.length <= 1) return
    
    const nextIndex = (currentIndex + 1) % validImages.length
    const img = new window.Image()
    img.src = encodeImageUrl(validImages[nextIndex])
  }, [currentIndex, validImages])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
  }, [validImages.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length)
  }, [validImages.length])

  // Keyboard navigation in modal
  useEffect(() => {
    if (!isModalOpen || validImages.length <= 1) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      } else if (e.key === "Escape") {
        setIsModalOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen, validImages.length, goToPrevious, goToNext])

  if (validImages.length === 0) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <Image
          src={product.image ? encodeImageUrl(product.image) : "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    )
  }

  return (
    <>
      {/* Preview Gallery */}
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted group cursor-pointer" onClick={() => setIsModalOpen(true)}>
        {validImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={encodeImageUrl(image)}
              alt={`${product.title} - Image ${index + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
        
        {/* Overlay with expand icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize2 className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Image counter */}
        {validImages.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {currentIndex + 1} / {validImages.length}
          </div>
        )}

        {/* Navigation dots */}
        {validImages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {validImages.slice(0, Math.min(validImages.length, 10)).map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Previous button */}
            {validImages.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 z-50 text-white hover:bg-white/20 h-12 w-12"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}

            {/* Next button */}
            {validImages.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 z-50 text-white hover:bg-white/20 h-12 w-12"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            )}

            {/* Main image */}
            <div className="relative w-full h-full flex items-center justify-center p-8">
              {validImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="relative w-full h-full max-w-5xl">
                    <Image
                      src={encodeImageUrl(image)}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Image counter in modal */}
            {validImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded">
                {currentIndex + 1} / {validImages.length}
              </div>
            )}

            {/* Thumbnail strip */}
            {validImages.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto px-4 pb-2">
                {validImages.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-20 h-20 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
                      index === currentIndex ? "border-white" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <Image
                      src={encodeImageUrl(image)}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

