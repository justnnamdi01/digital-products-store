"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Calendar, Package, ShoppingBag, FileText, CheckCircle } from "lucide-react"
import { useOrdersStore } from "@/lib/orders-store"
import { downloadFile } from "@/lib/download-helper"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function MyOrdersPage() {
  const { getAllOrders } = useOrdersStore()
  const [orders, setOrders] = useState<any[]>([])
  const [downloadedItems, setDownloadedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    setOrders(getAllOrders())
  }, [getAllOrders])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleDownload = (item: any) => {
    if (!item.downloadLink) {
      alert("Download link not available for this product.")
      return
    }
    
    const filename = `${item.title.substring(0, 50).replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
    downloadFile(item.downloadLink, filename)
    
    // Mark as downloaded
    setDownloadedItems(prev => new Set([...prev, item.id]))
    
    // Show success message
    setTimeout(() => {
      setDownloadedItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(item.id)
        return newSet
      })
    }, 3000)
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto" />
            <h1 className="text-3xl font-bold">My Orders</h1>
            <p className="text-lg text-muted-foreground">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Link href="/">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Orders</h1>
            <p className="text-muted-foreground">View and download all your purchased products</p>
          </div>

          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Order #{order.orderNumber}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(order.date)}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="relative w-full sm:w-24 h-32 sm:h-24 flex-shrink-0">
                          <Image
                            src={item.image ? encodeURI(item.image) : "/placeholder.jpg"}
                            alt={item.title}
                            fill
                            className="object-cover rounded"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold mb-1 line-clamp-2">{item.title}</h4>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                            <span>Quantity: {item.quantity}</span>
                            <span>${item.price.toFixed(2)} each</span>
                            <span className="font-medium text-foreground">
                              Total: ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
                        </div>
                        <div className="flex sm:flex-col items-end sm:items-start gap-2">
                          {downloadedItems.has(item.id) ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full sm:w-auto bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                              disabled
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Downloaded
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleDownload(item)}
                              variant="outline"
                              size="sm"
                              className="w-full sm:w-auto"
                              disabled={!item.downloadLink}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Download Instructions */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Download Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Click the "Download" button next to any product to download the PDF file directly to your device.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Downloads are saved to your default Downloads folder. Check your browser's download manager if needed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>You can download your products unlimited times - they're yours forever! No restrictions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>If you have any issues with downloads, try a different browser or contact our support team.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

