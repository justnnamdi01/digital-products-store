# How to Add Your Products from GitHub

This guide explains how to add your product data from the GitHub repository to your website.

## Current Product Data Location

All product data is now centralized in: **`lib/products.ts`**

## Product Data Structure

Each product should follow this structure:

\`\`\`typescript
{
  id: string                    // Unique identifier (e.g., "1", "2", "3")
  title: string                 // Product/course title
  description: string           // Short description (1-2 sentences)
  fullDescription: string       // Detailed description (2-3 paragraphs)
  price: number                 // Price in USD (e.g., 49.99)
  image: string                 // Image path (e.g., "/product-image.png")
  category: string              // Category (e.g., "Web Development", "Marketing")
  rating: number                // Rating out of 5 (e.g., 4.8)
  reviews: number               // Number of reviews (e.g., 1250)
  students: number              // Number of enrolled students (e.g., 15420)
  duration: string              // Course duration (e.g., "40 hours")
  level: string                 // Difficulty level (e.g., "Beginner to Advanced")
  instructor: string            // Instructor name
  instructorBio: string         // Instructor biography
  whatYouLearn: string[]        // Array of learning outcomes
  curriculum: Array<{           // Course curriculum sections
    title: string               // Section title
    lessons: number             // Number of lessons
    duration: string            // Section duration
  }>
}
\`\`\`

## Steps to Add Your Products

### Option 1: Manual Update (Recommended for now)

1. **Open** `lib/products.ts`
2. **Replace** the sample products array with your product data
3. **Add product images** to the `/public` folder
4. **Update** image paths in the product data to match your uploaded images

### Option 2: From GitHub Repository

If your GitHub repository contains product data in JSON format:

1. **Locate** your product data file in the GitHub repository
2. **Copy** the product information
3. **Format** it according to the structure above
4. **Paste** into `lib/products.ts`

## Example Product Entry

\`\`\`typescript
{
  id: "1",
  title: "Complete Web Development Bootcamp",
  description: "Master modern web development with HTML, CSS, JavaScript, React, and Node.js",
  fullDescription: "This comprehensive bootcamp will take you from beginner to advanced web developer...",
  price: 49.99,
  image: "/web-development-course.png",
  category: "Web Development",
  rating: 4.8,
  reviews: 1250,
  students: 15420,
  duration: "40 hours",
  level: "Beginner to Advanced",
  instructor: "John Smith",
  instructorBio: "Senior Full-Stack Developer with 10+ years of experience",
  whatYouLearn: [
    "Build responsive websites with HTML5 and CSS3",
    "Master JavaScript and modern ES6+ features",
    "Create dynamic web apps with React"
  ],
  curriculum: [
    { title: "Introduction to Web Development", lessons: 8, duration: "2 hours" },
    { title: "HTML5 & CSS3 Fundamentals", lessons: 12, duration: "4 hours" }
  ]
}
\`\`\`

## Adding Product Images

1. **Upload** your product images to the `/public` folder
2. **Name** them descriptively (e.g., `web-development-course.png`)
3. **Reference** them in the product data using the path `/image-name.png`

## Need Help?

If you need assistance adding your products or have questions about the data structure, please let me know and I can help you format your GitHub repository data correctly.
