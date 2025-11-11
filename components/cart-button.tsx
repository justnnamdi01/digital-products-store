"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { useEffect, useState } from "react"

export function CartButton() {
  const [mounted, setMounted] = useState(false)
  const totalItems = useCartStore((state) => state.getTotalItems())

  // Only render cart count after component mounts on client
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Button 
      variant="outline" 
      size="icon" 
      className="relative bg-transparent"
    >
      <ShoppingCart className="h-5 w-5" />
      {mounted && totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Button>
  )
}
