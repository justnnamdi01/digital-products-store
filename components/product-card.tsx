"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  id: string
  title: string
  description: string
  price: number
  image: string
  category: string
  rating?: number
  compact?: boolean
}

export function ProductCard({ id, title, description, price, image, category, rating = 4.5, compact = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({ id, title, price, image })
    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart.`,
    })
  }

  if (compact) {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <Link href={`/product/${id}`}>
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        <CardContent className="p-3 space-y-2 flex-1 flex flex-col">
          <Link href={`/product/${id}`}>
            <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">{title}</h3>
          </Link>
          <div className="flex items-center gap-1 mt-auto">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex flex-col gap-2">
          <span className="text-lg font-bold text-primary w-full">${price}</span>
          <Button size="sm" onClick={handleAddToCart} className="w-full text-xs">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/product/${id}`}>
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="p-4 space-y-2">
        <Badge variant="secondary" className="text-xs">
          {category}
        </Badge>
        <Link href={`/product/${id}`}>
          <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">{title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-sm text-muted-foreground">(120 reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">${price}</span>
        <Button size="sm" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
