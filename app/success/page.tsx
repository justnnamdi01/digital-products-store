"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useOrdersStore } from "@/lib/orders-store"
import { downloadMultipleFiles } from "@/lib/download-helper"
import Image from "next/image"
import { encodeImageUrl } from "@/lib/utils/image-url"

export default function SuccessPage() {
  const [latestOrder, setLatestOrder] = useState<any>(null)
  const [downloading, setDownloading] = useState(true)
  const { getAllOrders } = useOrdersStore()

  useEffect(() => {
    const orders = getAllOrders()
    if (orders.length > 0) {
      const order = orders[0]
      setLatestOrder(order)
      
      // Auto-download all PDFs
      const filesToDownload = order.items
        .filter((item: any) => item.downloadLink)
        .map((item: any) => ({
          url: item.downloadLink,
          filename: `${item.title.substring(0, 50).replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
        }))
      
      if (filesToDownload.length > 0) {
        // Start downloads after a short delay
        setTimeout(() => {
          downloadMultipleFiles(filesToDownload)
          setDownloading(false)
        }, 1000)
      } else {
        setDownloading(false)
      }
    }
  }, [getAllOrders])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-4">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
            <h1 className="text-4xl font-bold">Payment Successful! 🎉</h1>
          <p className="text-lg text-muted-foreground">
              Thank you for your purchase! Your order has been confirmed.
            </p>
            {downloading && (
              <div className="flex items-center justify-center gap-2 text-primary">
                <Download className="h-5 w-5 animate-bounce" />
                <span className="font-medium">Downloading your files...</span>
              </div>
            )}
          </div>

          {/* Order Details */}
          {latestOrder && (
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Order Confirmation</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4" />
                      Order #{latestOrder.orderNumber}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">${latestOrder.total.toFixed(2)}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Your Purchased Products:</h3>
                  <div className="space-y-4">
                    {latestOrder.items.map((item: any) => (
                      <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.image ? encodeImageUrl(item.image) : "/placeholder.jpg"}
                            alt={item.title}
                            fill
                            className="object-cover rounded"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold line-clamp-2">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Download Instructions */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                How to Access Your Products
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Check Your Downloads Folder</p>
                    <p className="text-sm text-muted-foreground">
                      Your files should have been automatically downloaded. Check your device's Downloads folder or your browser's download manager.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">If Files Weren't Downloaded Automatically</p>
                    <p className="text-sm text-muted-foreground">
                      Don't worry! Click the "View My Orders" button below to access all your purchased products. You can download them manually from there anytime.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Unlimited Downloads</p>
                    <p className="text-sm text-muted-foreground">
                      You can download your products unlimited times from the "My Orders" page. Your purchases are saved forever!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Information - Download Location */}
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Download className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                    Can't Find Your Downloads?
                  </p>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                    If the automatic download didn't work or you can't find your files, don't worry! All your purchased products are available in your account. Simply click the button below to go to "My Orders" where you can download any product with a single click.
                  </p>
                  <Link href="/my-orders">
                    <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Go to My Orders to Download
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/my-orders">
              <Button size="lg" className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                View My Orders
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

