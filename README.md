# Product Shop React App

A modern e-commerce frontend built with React, TypeScript, Material-UI (MUI), and Zustand.
Users can browse products, filter them by category, view detailed product pages, manage a basket, and edit their personal profile.

# Live Demo: product-card-frontend-azure.vercel.app

#Technologies Used:
- React 19
- TypeScript
- Material-UI (MUI)
- Zustand for global state
- Vite as the dev/build tool

# Features
1. Product Catalog
 - Responsive product grid built with Material-UI
 - Product details page with large image preview and thumbnails
 - Product availability indicator
 - Category-based filtering

2. Search & Filtering
 - Search bar integrated into the AppBar
 - Dynamic category filter dropdown

 3. Basket (Shopping Cart)
 - Add or remove items from the basket
 - Increase or decrease item quantity
 - Live item counter displayed in the header
 - Basket state persisted using Zustand

 4. Personal Profile
 - Editable user fields (name, email, phone)
 - Each field has a dedicated ✏️ edit icon
 - Inline editing with save and cancel controls

 5. Add Product Form
 - Allows adding new products to the store
 - Includes fields for name, description, price, category, quantity, and image URLs
 - Full validation (required fields, numeric checks)
 - Fields highlight errors with MUI helper text
 - Backend-ready structure (IDs are assigned by backend, not manually)

 6. UI & Styling
 - Custom MUI theme 
 - Consistent spacing and styling using MUI’s sx system
