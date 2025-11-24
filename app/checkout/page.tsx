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
      console.log("[PayPal] Initializing PayPal buttons", {
        totalPrice: getTotalPrice(),
        itemCount: items.length,
        timestamp: new Date().toISOString()
      })

      window.paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            console.log("[PayPal] Creating order", {
              amount: getTotalPrice().toFixed(2),
              items: items.map(i => ({ id: i.id, title: i.title, price: i.price, qty: i.quantity })),
              timestamp: new Date().toISOString()
            })

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
            console.log("[PayPal] Payment approved, capturing order", {
              orderID: data.orderID,
              payerID: data.payerID,
              timestamp: new Date().toISOString()
            })

            setLoading(true)
            
            try {
              const order = await actions.order.capture()
              console.log("[PayPal] Order captured successfully", {
                orderID: order.id,
                status: order.status,
                amount: order.purchase_units[0].amount.value,
                payer: order.payer.email_address,
                timestamp: new Date().toISOString()
              })
              
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
              
              console.log("[Order] Order saved to local storage", {
                orderId: savedOrder.id,
                itemCount: savedOrder.items.length,
                total: savedOrder.total,
                timestamp: new Date().toISOString()
              })

              // Trigger downloads immediately
              const filesToDownload = savedOrder.items
                .filter((it: any) => it.downloadLink)
                .map((it: any) => ({
                  url: it.downloadLink,
                  filename: `${it.title.substring(0, 50).replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
                }))
              
              if (filesToDownload.length > 0) {
                console.log("[Download] Initiating downloads", {
                  fileCount: filesToDownload.length,
                  files: filesToDownload.map(f => f.filename),
                  timestamp: new Date().toISOString()
                })
                downloadMultipleFiles(filesToDownload)
              } else {
                console.warn("[Download] No files to download", { timestamp: new Date().toISOString() })
              }
              
              clearCart()
              console.log("[Cart] Cart cleared", { timestamp: new Date().toISOString() })
              
              // Give the browser a moment to start the downloads before navigating
              setTimeout(() => {
                console.log("[Navigation] Redirecting to My Orders", { timestamp: new Date().toISOString() })
                router.push("/my-orders")
              }, 400)
            } catch (error) {
              console.error("[PayPal] Error capturing order", {
                error: error,
                errorMessage: error instanceof Error ? error.message : String(error),
                timestamp: new Date().toISOString()
              })
              alert("Payment processing error. Please contact support.")
              setLoading(false)
            }
          },
          onError: (err: any) => {
            console.error("[PayPal] Payment error", {
              error: err,
              errorMessage: err?.message || String(err),
              timestamp: new Date().toISOString()
            })
            alert("Payment failed. Please try again or contact support.")
            setLoading(false)
          },
          onCancel: (data: any) => {
            console.log("[PayPal] Payment cancelled by user", {
              orderID: data?.orderID,
              timestamp: new Date().toISOString()
            })
            setLoading(false)
          }
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
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address (for order confirmation)</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Your purchase details and download links will be sent to this email.
                </p>
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
