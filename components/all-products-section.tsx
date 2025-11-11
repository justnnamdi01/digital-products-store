"use client"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { products, getAllCategories, getCourseSubcategories, getCoursesBySubcategory } from "@/lib/products"
import { useState } from "react"
import { Filter } from "lucide-react"

export function AllProductsSection() {
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
    <div className="space-y-8">
      {/* Filters */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <div className="space-y-4">
          {/* Main Categories */}
          <div className="flex items-start gap-4 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 flex-shrink-0 pt-1">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange("all")}
              >
                All Products
                <Badge variant="secondary" className="ml-2">
                  {products.length}
                </Badge>
              </Button>
              {categories.map((category) => {
                const count = products.filter(p => p.category === category).length
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                    <Badge variant="secondary" className="ml-2">
                      {count}
                    </Badge>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Subcategories for COURSES */}
          {selectedCategory === "COURSES" && courseSubcategories.length > 0 && (
            <div className="flex items-start gap-4 overflow-x-auto pl-6 border-l-2 border-primary/30 pb-2">
              <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                <span className="text-sm font-medium">Courses:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedSubcategory ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubcategory(null)}
                >
                  All Courses
                </Button>
                {courseSubcategories.map((subcategory) => {
                  const count = getCoursesBySubcategory(subcategory).length
                  return (
                    <Button
                      key={subcategory}
                      variant={selectedSubcategory === subcategory ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSubcategory(subcategory)}
                    >
                      {subcategory}
                      <Badge variant="secondary" className="ml-2">
                        {count}
                      </Badge>
                    </Button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Count */}
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="secondary" className="mb-2">
            {filteredProducts.length} Products
          </Badge>
          <h3 className="text-xl font-bold">
            {selectedSubcategory || (selectedCategory === "all" ? "All Products" : selectedCategory)}
          </h3>
        </div>
      </div>

      {/* Products Grid */}
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
  )
}


