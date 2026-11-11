export type ScreenId =
  | 'welcome'
  | 'home'
  | 'shop'
  | 'pdp'
  | 'look'
  | 'saved'
  | 'bag'
  | 'login'
  | 'register'
  | 'checkout'
  | 'confirmation'
  | 'orders'
  | 'order-detail';

export type ViewportMode = 'responsive' | 'desktop' | 'mobile';

export type SimulationState =
  | 'default'
  | 'loading'
  | 'empty'
  | 'error'
  | 'sold_out'
  | 'checkout_recovery';

export type ThemeMode = 'system' | 'light' | 'dark';

export interface ProductVariant {
  id: string;
  sku: string;
  colorName: string;
  colorHex: string;
  size: string;
  stock: number;
  priceKobo: number; // Stored in minor units (kobo)
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'Tailoring' | 'Outerwear' | 'Footwear' | 'Essentials' | 'Accessories';
  description: string;
  fabricDetails: string[];
  careInstructions: string[];
  basePriceKobo: number; // in kobo (100 kobo = 1 Naira)
  images: ProductImage[];
  variants: ProductVariant[];
  isAvailable: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

export interface LookPiece {
  id: string;
  product: Product;
  defaultVariantId: string;
  selectedVariantId: string;
  included: boolean;
  isSoldOut?: boolean;
}

export interface Look {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  editorialImageUrl: string;
  pieces: LookPiece[];
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  productName: string;
  productImage: string;
  colorName: string;
  size: string;
  unitPriceKobo: number;
  quantity: number;
  maxStock: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  productName: string;
  colorName: string;
  size: string;
  priceAtPurchaseKobo: number;
  quantity: number;
  subtotalKobo: number;
  image: string;
}

export interface Order {
  id: string;
  orderReference: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';
  subtotalKobo: number;
  shippingKobo: number;
  totalKobo: number;
  itemCount: number;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    phone: string;
  };
  deliveryMethod: string;
  paymentMethod: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  size: string;
  color: string;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}
