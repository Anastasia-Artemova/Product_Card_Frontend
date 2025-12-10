import {create} from 'zustand';
import { API_BASE_URL } from './config';

export interface Product{
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    quantity: number;
    category: string;
}

export interface NewProduct{
    name: string;
    description: string;
    price: number;
    images: string[];
    quantity: number;
    category: string;
}

export interface BasketItem{
    productId: number;
    quantity: number;
}

export interface ShopState{
    products: Product[];
    addProduct: (product: NewProduct) => Promise<void>;
    removeProduct: (id: number) => Promise<void>;
    productsInBasket: BasketItem[];
    addToBasket: (id: number) => void;
    removeFromBasket: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    fetchProducts: (category?: string) => Promise<void>;
    filteredProducts: Product[];
    fetchCategories: () => Promise<string[]>;
}

const useShopState = create<ShopState>((set) => ({
    products: [],
    productsInBasket: [],
    filteredProducts: [],
    
    addProduct: async (product: NewProduct) => {
        try{
            const response = await fetch(`${API_BASE_URL}/products`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(product),
            });

            if(!response.ok){
                throw new Error("Failed to create the product");
            }

            const new_prod = await response.json();

            set((state) => ({
                products: [...state.products, new_prod],
                filteredProducts: [...state.filteredProducts, new_prod],
            }));
        } catch(e){
            console.error('Failed to add product:', e);
            throw e;
        }
    },
    
    removeProduct: async (id: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/products/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            set((state) => ({
                products: state.products.filter((product) => product.id !== id),
                filteredProducts: state.filteredProducts.filter((product) => product.id !== id),
            }));
        } catch (e) {
            console.error('Failed to remove product:', e);
            throw e;
        }
    },
    
    addToBasket: (id: number) => set((state) => {
        const exist = state.productsInBasket.find((item) => item.productId === id);
        if (exist) {
            return {};
        }
        return {
            productsInBasket: [...state.productsInBasket, {productId: id, quantity: 1}],
        };
    }),
    
    removeFromBasket: (id: number) => set((state) => ({
        productsInBasket: state.productsInBasket.filter((product) => product.productId !== id),
    })),
    
    increaseQuantity: (id: number) => set((state) => {
        const exist = state.productsInBasket.find((item) => item.productId === id);
        if (exist) {
            return {
                productsInBasket: state.productsInBasket.map((item) =>
                    item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };
        }
        return {};
    }),
    
    decreaseQuantity: (id: number) => set((state) => {
        const exist = state.productsInBasket.find((item) => item.productId === id);
        if (!exist) {
            return {};
        }
        if (exist.quantity > 1) {
            return {
                productsInBasket: state.productsInBasket.map((item) =>
                    item.productId === id ? { ...item, quantity: item.quantity - 1 } : item
                ),
            };
        }
        return {
            productsInBasket: state.productsInBasket.filter((item) => item.productId !== id),
        };
    }),
        
    fetchProducts: async (category?: string) => {
        try {
            const url = category 
                ? `${API_BASE_URL}/products?category=${encodeURIComponent(category)}`
                : `${API_BASE_URL}/products`;
                
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            
            const data = await response.json();
            set({ products: data, filteredProducts: data });
            
        } catch (error) {
            console.error('Failed to fetch products:', error);
            throw error;
        }
    },

    fetchCategories: async () => {
        try{
            const url = `${API_BASE_URL}/products`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }        
            const data = await response.json();
            return Array.from(new Set(data.map((el: Product) => el.category)));
        }
        catch(e){
            throw e;
        }
        return [];
    }
}));

export default useShopState;