"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { products, getAllCategories, getCourseSubcategories, getCoursesBySubcategory } from "@/lib/products"
import { useState } from "react"
import { Filter } from "lucide-react"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const categories = getAllCategories()
  const courseSubcategories = getCourseSubcategories()

  const filteredProducts = selectedSubcategory
    ? getCoursesBySubcategory(selectedSubcategory)
    : selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory)
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSelectedSubcategory(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                All Products
              </h1>
              <p className="text-lg text-muted-foreground">
                Browse our complete collection of premium courses, design bundles, and digital products
              </p>
              <Badge variant="secondary" className="text-base px-4 py-2">
                {filteredProducts.length} Products Available
              </Badge>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-16 z-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="space-y-3">
              {/* Main Categories */}
              <div className="flex items-center gap-4 overflow-x-auto">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Category:</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange("all")}
                  >
                    All Products
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Subcategories for COURSES */}
              {selectedCategory === "COURSES" && courseSubcategories.length > 0 && (
                <div className="flex items-center gap-4 overflow-x-auto pl-6 border-l-2 border-primary/30">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-medium">Courses:</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={!selectedSubcategory ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSubcategory(null)}
                    >
                      All Courses
                    </Button>
                    {courseSubcategories.map((subcategory) => (
                      <Button
                        key={subcategory}
                        variant={selectedSubcategory === subcategory ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSubcategory(subcategory)}
                      >
                        {subcategory}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
