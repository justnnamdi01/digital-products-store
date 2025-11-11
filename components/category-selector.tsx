"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ArrowLeft, MousePointerClick, Grid3x3 } from "lucide-react"
import { getProductsByCategory, products, getCoursesBySubcategory, getCourseSubcategories } from "@/lib/products"

const categories = [
  {
    id: "COURSES",
    name: "Courses",
    description: "Professional education and skill development programs",
    gradient: "from-slate-800 to-slate-950",
    borderColor: "border-slate-700",
    hoverBorder: "hover:border-slate-600",
    textColor: "text-slate-400",
    glowFrom: "from-slate-700",
    glowTo: "to-slate-900",
    floatAnimation: "animate-float",
  },
  {
    id: "RESELL BUNDLE",
    name: "Resell Bundle",
    description: "Commercial-ready digital products for business ventures",
    gradient: "from-blue-900 to-indigo-950",
    borderColor: "border-blue-800",
    hoverBorder: "hover:border-blue-700",
    textColor: "text-blue-300",
    glowFrom: "from-blue-800",
    glowTo: "to-indigo-950",
    floatAnimation: "animate-float-delayed",
  },
  {
    id: "T-SHIRT DESIGN",
    name: "T-Shirt Design",
    description: "High-quality design assets for print-on-demand",
    gradient: "from-neutral-800 to-neutral-950",
    borderColor: "border-neutral-700",
    hoverBorder: "hover:border-neutral-600",
    textColor: "text-neutral-400",
    glowFrom: "from-neutral-700",
    glowTo: "to-neutral-900",
    floatAnimation: "animate-float-slow",
  },
]

export function CategorySelector() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [showAllProducts, setShowAllProducts] = useState(false)

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedSubcategory(null)
    setShowAllProducts(false)
  }

  const handleSubcategoryClick = (subcategory: string) => {
    setSelectedSubcategory(subcategory)
  }

  const handleViewAll = () => {
    setShowAllProducts(true)
    setSelectedCategory(null)
    setSelectedSubcategory(null)
  }

  const handleBack = () => {
    if (selectedSubcategory) {
      setSelectedSubcategory(null)
    } else {
      setSelectedCategory(null)
      setShowAllProducts(false)
    }
  }

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory)
  const courseSubcategories = selectedCategory === "COURSES" ? getCourseSubcategories() : []
  
  const selectedProducts = selectedSubcategory
    ? getCoursesBySubcategory(selectedSubcategory)
    : selectedCategory 
    ? getProductsByCategory(selectedCategory) 
    : showAllProducts 
    ? products 
    : []

  return (
    <div className="w-full">
      {/* Category Cards Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Instruction Text - Only show when no category is selected */}
        {!selectedCategory && !showAllProducts && (
          <div className="text-center mb-8 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                <MousePointerClick className="h-5 w-5" />
                <p className="text-sm font-medium">Select a category to explore products</p>
              </div>
              <p className="text-xs text-muted-foreground">Click on any card below to view available products</p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleViewAll}
              className="gap-2"
            >
              <Grid3x3 className="h-4 w-4" />
              View All Products
            </Button>
          </div>
        )}

        <div 
          className={`max-w-5xl mx-auto -mb-24 transition-all duration-500 ${
            selectedCategory ? 'mb-8' : ''
          }`}
        >
          {/* Back Button */}
          {(selectedCategory || selectedSubcategory) && (
            <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <Button
                onClick={handleBack}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {selectedSubcategory ? "Back to Course Categories" : "Back to Categories"}
              </Button>
            </div>
          )}

          <div 
            className={`grid transition-all duration-500 gap-6 ${
              selectedCategory 
                ? 'grid-cols-1 max-w-xl mx-auto' 
                : 'grid-cols-1 md:grid-cols-3'
            }`}
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id
              const isHidden = selectedCategory && !isSelected
              const productCount = getProductsByCategory(category.id).length

              if (isHidden) return null

              return (
                <div
                  key={category.id}
                  onClick={() => !selectedCategory && handleCategoryClick(category.id)}
                  className={`group relative block transition-all duration-500 ${
                    isSelected 
                      ? 'scale-100 animate-in fade-in zoom-in-95 duration-500' 
                      : `cursor-pointer ${category.floatAnimation}`
                  } ${isHidden ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-br ${category.glowFrom} ${category.glowTo} rounded-lg blur ${
                    isSelected ? 'opacity-70' : 'opacity-40 group-hover:opacity-60'
                  } transition duration-300`}></div>
                  <div className={`relative bg-gradient-to-br ${category.gradient} rounded-lg p-8 ${
                    isSelected ? 'h-auto' : 'h-64'
                  } flex flex-col justify-between text-center border ${category.borderColor} ${
                    !isSelected && category.hoverBorder
                  } transition-all duration-300`}>
                    <div>
                      <div className={`text-xs uppercase tracking-wider ${category.textColor} mb-2 flex items-center justify-center relative`}>
                        <span>Category</span>
                        {isSelected && (
                          <button 
                            onClick={handleBack}
                            className="absolute right-0 p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{category.name}</h3>
                      <p className="text-sm text-slate-300">
                        {category.description}
                      </p>
                    </div>
                    <div className={`flex items-center justify-center gap-2 ${isSelected ? 'mt-4' : ''}`}>
                      <span className={`text-xs ${category.textColor}`}>{productCount} Products</span>
                      {!isSelected && (
                        <span className={`${category.textColor} group-hover:text-white transition-colors`}>→</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Subcategories for COURSES */}
        {selectedCategory === "COURSES" && !selectedSubcategory && courseSubcategories.length > 0 && (
          <div className="mt-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Choose Your Learning Path</h3>
                <p className="text-sm text-muted-foreground">Select a subcategory to explore courses</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {courseSubcategories.map((subcategory) => {
                  const count = getCoursesBySubcategory(subcategory).length
                  return (
                    <Button
                      key={subcategory}
                      onClick={() => handleSubcategoryClick(subcategory)}
                      variant="outline"
                      className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      {subcategory}
                      <Badge variant="secondary" className="ml-2 group-hover:bg-primary-foreground group-hover:text-primary">
                        {count}
                      </Badge>
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Products Display for Selected Category or All Products */}
        {((selectedCategory && selectedSubcategory) || (selectedCategory && selectedCategory !== "COURSES") || showAllProducts) && (
          <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <Badge variant="secondary" className="mb-3">
                  {selectedProducts.length} Products
                </Badge>
                <h2 className="text-3xl font-bold">
                  {showAllProducts ? "All Products" : selectedSubcategory || selectedCategoryData?.name}
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {selectedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-in fade-in slide-in-from-bottom-4"
                    style={{
                      animationDelay: `${index * 30}ms`,
                      animationFillMode: 'backwards'
                    }}
                  >
                    <ProductCard {...product} compact />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

