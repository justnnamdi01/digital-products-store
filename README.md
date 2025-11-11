# 24 Digital Products - E-commerce Platform

A modern, full-featured digital products marketplace built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Product Catalog**: Browse 38+ digital products across multiple categories
  - Online Courses
  - Resell Bundles
  - T-Shirt Designs
- **Smart Filtering**: Category and subcategory filtering with smooth animations
- **Shopping Cart**: Persistent cart with Zustand state management
- **Secure Checkout**: PayPal integration for payments
- **Order Management**: View and re-download purchases anytime
- **Automatic Downloads**: PDFs download automatically after purchase
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Mode Support**: Beautiful UI in light and dark themes

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with localStorage persistence
- **Payments**: PayPal SDK
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Install dependencies
npm install

# Set up environment variables
# Create .env.local and add:
# NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Vercel.

Quick deploy:
```bash
git push origin main
# Then import to Vercel from github.com/vercel/import
```

## 📁 Project Structure

```
├── app/                  # Next.js app directory
│   ├── page.tsx         # Homepage (product listing)
│   ├── cart/            # Shopping cart page
│   ├── checkout/        # Checkout page
│   ├── success/         # Order success page
│   ├── my-orders/       # Order history
│   ├── about/           # About page
│   └── contact/         # Contact page
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── header.tsx      # Navigation header
│   ├── footer.tsx      # Footer
│   └── product-card.tsx # Product display card
├── lib/                 # Utilities and data
│   ├── products.ts     # Product data and helpers
│   ├── cart-store.ts   # Cart state management
│   ├── orders-store.ts # Orders state management
│   └── download-helper.ts # File download utilities
├── public/             # Static assets
│   └── WEBSITE SOURCE/ # Product files and PDFs
└── styles/            # Global styles
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_production_client_id
```

### PayPal Setup

1. Go to [PayPal Developer](https://developer.paypal.com/)
2. Create an app in Dashboard → Apps & Credentials
3. Switch to "Live" mode for production
4. Copy the Client ID
5. Add to `.env.local` or Vercel environment variables

## 💳 Payment Flow

1. User adds products to cart
2. Proceeds to checkout
3. Completes PayPal payment
4. PDFs automatically download
5. Order saved to "My Orders" for re-download

## 📱 Contact Information

- **Email**: 24digitalmarket@gmail.com
- **WhatsApp**: +230 59382734
- **Support**: Available 24/7

## 🔐 Security

- All payments processed through PayPal
- No credit card data stored locally
- Secure HTTPS with automatic SSL (Vercel)
- Client-side order encryption with localStorage

## 📈 Performance

- Optimized images with Next.js Image component
- Static generation where possible
- CDN delivery through Vercel
- Lazy loading for better performance

## 🎨 Customization

### Adding Products

1. Add product images to `/public/WEBSITE SOURCE/`
2. Add product details to `lib/products.ts`
3. Ensure download links point to correct PDF paths

### Changing Theme

Modify `tailwind.config.ts` for color schemes and styling.

### Update Contact Info

Edit `app/contact/page.tsx` and `components/footer.tsx`

## 📄 License

This is a commercial project. All rights reserved.

## 🤝 Support

For issues or questions:
- Email: 24digitalmarket@gmail.com
- WhatsApp: +230 59382734

## 🚀 Roadmap

- [ ] Email notifications for orders
- [ ] Advanced search functionality
- [ ] User accounts and authentication
- [ ] Wishlist feature
- [ ] Reviews and ratings
- [ ] Multiple payment gateways
- [ ] Affiliate program

---

Built with ❤️ using Next.js and Vercel

