import { Product } from "@/lib/products"

/**
 * Get all available images for a product
 * Based on the product's image path, finds all numbered images (1.png, 2.png, etc.)
 */
export function getProductImages(product: Product): string[] {
  const baseImage = product.image
  if (!baseImage) return []

  // Extract the directory path and file extension
  const lastSlash = baseImage.lastIndexOf('/')
  const directory = baseImage.substring(0, lastSlash + 1)
  const filename = baseImage.substring(lastSlash + 1)
  
  // Extract extension (could be .png, .jpg, .jpeg)
  const extMatch = filename.match(/\.(png|jpg|jpeg|webp)$/i)
  if (!extMatch) return [baseImage]
  
  const extension = extMatch[0]
  
  // Try to find images numbered 1-20
  const images: string[] = []
  for (let i = 1; i <= 20; i++) {
    const imagePath = `${directory}${i}${extension}`
    images.push(imagePath)
  }
  
  return images
}

/**
 * Check if a product should have an image gallery
 * Now applies to all products
 */
export function hasImageGallery(product: Product): boolean {
  return true // Enable gallery for all products
}

