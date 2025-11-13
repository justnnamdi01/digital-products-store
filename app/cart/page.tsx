"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Head from "next/head"
import { encodeImageUrl } from "@/lib/utils/image-url"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  const router = useRouter()

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <>
        <Head>
          <title>Cart - 24 Digital Products</title>
          <meta
            name="description"
            content="View your shopping cart and proceed to checkout for premium online courses."
          />
          <meta name="robots" content="noindex, follow" />
        </Head>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
              <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
                <p className="text-lg text-muted-foreground">
                  Looks like you haven't added any products to your cart yet.
                </p>
              </div>

              <div className="text-center space-y-4">
                <p className="text-muted-foreground">Or browse our collection</p>
              <Link href="/">
                  <Button size="lg">Browse All Products</Button>
              </Link>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Cart ({items.length} items) - 24 Digital Products</title>
        <meta name="description" content="Review your selected courses and proceed to secure checkout." />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                        <Image src={item.image ? encodeImageUrl(item.image) : "/placeholder.svg"} alt={item.title} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-xl font-bold text-primary">${item.price}</p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 ml-auto text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Order Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-lg text-primary">${getTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                  <Link href="/">
                    <Button variant="outline" className="w-full bg-transparent">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
