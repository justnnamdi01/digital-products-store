"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCartStore } from "@/lib/cart-store"
import { useOrdersStore } from "@/lib/orders-store"
import { getProductById } from "@/lib/products"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { downloadMultipleFiles } from "@/lib/download-helper"

declare global {
  interface Window {
    paypal?: any
  }
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { addOrder } = useOrdersStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [paypalLoaded, setPaypalLoaded] = useState(false)

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
      return
    }

    // Load PayPal SDK
    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test"}&currency=USD`
    script.async = true
    script.onload = () => setPaypalLoaded(true)
    document.body.appendChild(script)

    return () => {
      // Safely remove script only if it exists and is still a child
      if (script && document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [items, router])

  useEffect(() => {
    if (paypalLoaded && window.paypal) {
      window.paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: getTotalPrice().toFixed(2),
                  },
                },
              ],
            })
          },
          onApprove: async (data: any, actions: any) => {
            setLoading(true)
            const order = await actions.order.capture()
            console.log("Order successful:", order)
            
            // Save order to orders store
            const orderItems = items.map(item => {
              const product = getProductById(item.id)
              return {
                id: item.id,
                title: item.title,
                price: item.price,
                image: item.image,
                quantity: item.quantity,
                category: product?.category || "COURSES",
              }
            })
            const savedOrder = addOrder(orderItems, getTotalPrice())

            // Trigger downloads immediately
            const filesToDownload = savedOrder.items
              .filter((it: any) => it.downloadLink)
              .map((it: any) => ({
                url: it.downloadLink,
                filename: `${it.title.substring(0, 50).replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
              }))
            if (filesToDownload.length > 0) {
              downloadMultipleFiles(filesToDownload)
            }
            
            clearCart()
            // Give the browser a moment to start the downloads before navigating
            setTimeout(() => router.push("/my-orders"), 400)
          },
          onError: (err: any) => {
            console.error("PayPal error:", err)
            alert("Payment failed. Please try again.")
            setLoading(false)
          },
        })
        .render("#paypal-button-container")
    }
  }, [paypalLoaded, getTotalPrice, clearCart, router, items, addOrder])

  // Removed test payment handler for production readiness

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or pay with</span>
                  </div>
                </div>

                {/* PayPal Button */}
                {loading && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
                <div id="paypal-button-container" className={loading ? "hidden" : ""}></div>
                {!paypalLoaded && !loading && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Loading PayPal...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.title} x {item.quantity}
                      </span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-lg text-primary">${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
