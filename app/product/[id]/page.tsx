"use client"

import { use } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Clock, Users, Award, CheckCircle, Play } from "lucide-react"
import Image from "next/image"
import { useCartStore } from "@/lib/cart-store"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { getProductById } from "@/lib/products"
import { encodeImageUrl } from "@/lib/utils/image-url"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getProductById(id)
  const addItem = useCartStore((state) => state.addItem)
  const { toast } = useToast()
  const router = useRouter()

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => router.push("/")}>Back to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    })
  }

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    })
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: product.title,
            description: product.fullDescription,
            provider: {
              "@type": "Organization",
              name: "24 Digital Products",
              sameAs: "https://24digitalproducts.com",
            },
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviews,
            },
            instructor: {
              "@type": "Person",
              name: product.instructor,
              description: product.instructorBio,
            },
          }),
        }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <Badge variant="secondary">{product.category}</Badge>
                <h1 className="text-4xl font-bold text-balance leading-tight">{product.title}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{product.fullDescription}</p>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-5 w-5" />
                    <span>{product.students.toLocaleString()} students</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{product.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>{product.level}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-1">Created by</p>
                  <p className="font-semibold">{product.instructor}</p>
                  <p className="text-sm text-muted-foreground">{product.instructorBio}</p>
                </div>
              </div>

              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-6">
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={product.image ? encodeImageUrl(product.image) : "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Button size="lg" variant="secondary" className="rounded-full">
                        <Play className="h-5 w-5 mr-2" />
                        Preview Course
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">${product.price}</div>
                    <p className="text-sm text-muted-foreground">One-time payment • Lifetime access</p>
                  </div>

                  <div className="space-y-3">
                    <Button size="lg" className="w-full" onClick={handleBuyNow}>
                      Buy Now
                    </Button>
                    <Button size="lg" variant="outline" className="w-full bg-transparent" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                  </div>

                  <div className="border-t border-border pt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Course Details */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.whatYouLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                    <div className="space-y-4">
                      {product.curriculum.map((section, index) => (
                        <div key={index} className="border border-border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{section.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {section.lessons} lessons • {section.duration}
                              </p>
                            </div>
                            <Play className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold">{product.rating}</div>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{product.reviews} reviews</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {[
                        {
                          name: "Alex Johnson",
                          rating: 5,
                          comment:
                            "Excellent course! Very comprehensive and well-structured. The instructor explains everything clearly.",
                          date: "2 weeks ago",
                        },
                        {
                          name: "Maria Garcia",
                          rating: 5,
                          comment:
                            "Best investment I've made in my career. Highly recommend to anyone looking to learn.",
                          date: "1 month ago",
                        },
                        {
                          name: "James Wilson",
                          rating: 4,
                          comment: "Great content overall. Would love to see more advanced topics covered.",
                          date: "1 month ago",
                        },
                      ].map((review, index) => (
                        <div key={index} className="border-b border-border pb-6 last:border-0">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold">{review.name}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
