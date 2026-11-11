import { Product, Look, Order } from '../types/store';

export const HERO_CAMPAIGN_IMG = '/src/assets/images/hero_campaign_1794392882734.jpg';
export const LOOK_EDITORIAL_IMG = '/src/assets/images/look_editorial_1794392882898.jpg';
export const PRODUCT_BLAZER_IMG = '/src/assets/images/product_blazer_1794392884561.jpg';
export const PRODUCT_TROUSERS_IMG = '/src/assets/images/product_trousers_1794392884149.jpg';
export const PRODUCT_LOAFERS_IMG = '/src/assets/images/product_loafers_1794392884524.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'atelier-double-breasted-linen-blazer',
    name: 'Atelier Double-Breasted Linen Blazer',
    subtitle: 'Unstructured tailoring in 100% natural Normandy flax',
    category: 'Tailoring',
    description:
      'Crafted from high-density, breathable raw linen woven with subtle slub texture. Features natural horn buttons, unstructured soft shoulders, and clean interior French seams designed for tropical comfort and architectural elegance.',
    fabricDetails: [
      '100% Organic Normandy Flax Linen',
      'Unlined body for maximum breathability',
      'Hand-sewn horn buttons with cross-stitch',
      'Dual rear vents and interior welt breast pocket'
    ],
    careInstructions: [
      'Dry clean gently or cool hand wash with enzyme-free detergent',
      'Steam press on reverse side',
      'Store on wide-shoulder contoured wooden hanger'
    ],
    basePriceKobo: 7800000, // ₦78,000
    isAvailable: true,
    isFeatured: true,
    isNewArrival: true,
    images: [
      { id: 'img-1-1', url: PRODUCT_BLAZER_IMG, alt: 'Atelier Double-Breasted Linen Blazer in Warm Ivory', isPrimary: true, order: 1 },
      { id: 'img-1-2', url: HERO_CAMPAIGN_IMG, alt: 'Atelier Linen Blazer styled in Lagos editorial architectural setting', isPrimary: false, order: 2 }
    ],
    variants: [
      { id: 'var-1-s-ivory', sku: 'DW-BLZ-IVR-S', colorName: 'Warm Ivory', colorHex: '#F5F1E8', size: 'S', stock: 4, priceKobo: 7800000 },
      { id: 'var-1-m-ivory', sku: 'DW-BLZ-IVR-M', colorName: 'Warm Ivory', colorHex: '#F5F1E8', size: 'M', stock: 2, priceKobo: 7800000 },
      { id: 'var-1-l-ivory', sku: 'DW-BLZ-IVR-L', colorName: 'Warm Ivory', colorHex: '#F5F1E8', size: 'L', stock: 0, priceKobo: 7800000 }, // SOLD OUT variant for testing!
      { id: 'var-1-xl-ivory', sku: 'DW-BLZ-IVR-XL', colorName: 'Warm Ivory', colorHex: '#F5F1E8', size: 'XL', stock: 3, priceKobo: 7800000 },
      { id: 'var-1-m-black', sku: 'DW-BLZ-BLK-M', colorName: 'Ink Black', colorHex: '#181716', size: 'M', stock: 5, priceKobo: 7800000 },
      { id: 'var-1-l-black', sku: 'DW-BLZ-BLK-L', colorName: 'Ink Black', colorHex: '#181716', size: 'L', stock: 3, priceKobo: 7800000 }
    ]
  },
  {
    id: 'prod-002',
    slug: 'pleated-wide-leg-wool-trousers',
    name: 'Pleated Wide-Leg Wool-Blend Trousers',
    subtitle: 'Relaxed fluid drape with deep front forward pleats',
    category: 'Tailoring',
    description:
      'Engineered with double forward knife pleats and an extended waistband tab. The high-twist wool and tropical viscose blend creates an effortless drape that retains sharp center creases through all-day wear.',
    fabricDetails: [
      '55% High-Twist Merino Wool, 45% Tropical Viscose',
      'Extended tab waist closure with hidden interior anchor button',
      'Deep quarter-top side pockets and rear welt pockets',
      'Unfinished hem length for custom tailoring'
    ],
    careInstructions: [
      'Specialist dry clean only',
      'Warm iron with damp pressing cloth'
    ],
    basePriceKobo: 5200000, // ₦52,000
    isAvailable: true,
    isFeatured: true,
    isNewArrival: false,
    images: [
      { id: 'img-2-1', url: PRODUCT_TROUSERS_IMG, alt: 'Pleated Wide-Leg Trousers in Muted Olive', isPrimary: true, order: 1 },
      { id: 'img-2-2', url: LOOK_EDITORIAL_IMG, alt: 'Pleated Wide-Leg Trousers styled in full ensemble', isPrimary: false, order: 2 }
    ],
    variants: [
      { id: 'var-2-30-olive', sku: 'DW-TRS-OLV-30', colorName: 'Muted Olive', colorHex: '#525B40', size: '30', stock: 6, priceKobo: 5200000 },
      { id: 'var-2-32-olive', sku: 'DW-TRS-OLV-32', colorName: 'Muted Olive', colorHex: '#525B40', size: '32', stock: 4, priceKobo: 5200000 },
      { id: 'var-2-34-olive', sku: 'DW-TRS-OLV-34', colorName: 'Muted Olive', colorHex: '#525B40', size: '34', stock: 5, priceKobo: 5200000 },
      { id: 'var-2-36-olive', sku: 'DW-TRS-OLV-36', colorName: 'Muted Olive', colorHex: '#525B40', size: '36', stock: 1, priceKobo: 5200000 },
      { id: 'var-2-32-charcoal', sku: 'DW-TRS-CHR-32', colorName: 'Deep Charcoal', colorHex: '#282726', size: '32', stock: 4, priceKobo: 5200000 },
      { id: 'var-2-34-charcoal', sku: 'DW-TRS-CHR-34', colorName: 'Deep Charcoal', colorHex: '#282726', size: '34', stock: 3, priceKobo: 5200000 }
    ]
  },
  {
    id: 'prod-003',
    slug: 'heritage-trench-utility-overcoat',
    name: 'Heritage Trench Utility Overcoat',
    subtitle: 'Signature oversized silhouette with self-fabric belt',
    category: 'Outerwear',
    description:
      'The crown outerwear piece of the Diran Wears core wardrobe. Cut with storm flap details, raglan shoulder construction for fluid movement, and an optional cinching tie belt. Water-repellent gabardine finish.',
    fabricDetails: [
      '100% Compact Cotton Gabardine (380 GSM)',
      'Water-repellent ecological fluorine-free treatment',
      'Horn button cuff straps and storm collar buckle',
      'Dual deep welt cargo pockets'
    ],
    careInstructions: [
      'Wipe clean with cool damp sponge',
      'Dry clean when necessary'
    ],
    basePriceKobo: 14500000, // ₦145,000
    isAvailable: true,
    isFeatured: true,
    isNewArrival: true,
    images: [
      { id: 'img-3-1', url: LOOK_EDITORIAL_IMG, alt: 'Heritage Trench Utility Overcoat in Muted Olive', isPrimary: true, order: 1 }
    ],
    variants: [
      { id: 'var-3-s-olive', sku: 'DW-TRN-OLV-S', colorName: 'Muted Olive', colorHex: '#525B40', size: 'S', stock: 3, priceKobo: 14500000 },
      { id: 'var-3-m-olive', sku: 'DW-TRN-OLV-M', colorName: 'Muted Olive', colorHex: '#525B40', size: 'M', stock: 2, priceKobo: 14500000 },
      { id: 'var-3-l-olive', sku: 'DW-TRN-OLV-L', colorName: 'Muted Olive', colorHex: '#525B40', size: 'L', stock: 2, priceKobo: 14500000 }
    ]
  },
  {
    id: 'prod-004',
    slug: 'polished-calfskin-penny-loafer',
    name: 'Polished Calfskin Penny Loafer',
    subtitle: 'Hand-lasted Goodyear welted footwear with leather sole',
    category: 'Footwear',
    description:
      'Sculpted from full-grain French calfskin with a luminous micro-polish finish. Built on an almond-toe heritage last with stacked leather heels and hand-stitched apron detailing.',
    fabricDetails: [
      '100% Full-Grain French Box Calf Leather',
      'Full calfskin glove lining and cushioned leather footbed',
      'Goodyear welted construction for lifelong resoling',
      'Beveled hand-burnished sole edges'
    ],
    careInstructions: [
      'Clean with horsehair brush and neutral beeswax polish',
      'Always insert cedar shoe trees after wear'
    ],
    basePriceKobo: 8800000, // ₦88,000
    isAvailable: true,
    isFeatured: true,
    isNewArrival: false,
    images: [
      { id: 'img-4-1', url: PRODUCT_LOAFERS_IMG, alt: 'Polished Calfskin Penny Loafer in Ink Black', isPrimary: true, order: 1 }
    ],
    variants: [
      { id: 'var-4-41-black', sku: 'DW-LFR-BLK-41', colorName: 'Ink Black', colorHex: '#121110', size: 'EU 41', stock: 3, priceKobo: 8800000 },
      { id: 'var-4-42-black', sku: 'DW-LFR-BLK-42', colorName: 'Ink Black', colorHex: '#121110', size: 'EU 42', stock: 4, priceKobo: 8800000 },
      { id: 'var-4-43-black', sku: 'DW-LFR-BLK-43', colorName: 'Ink Black', colorHex: '#121110', size: 'EU 43', stock: 2, priceKobo: 8800000 },
      { id: 'var-4-44-black', sku: 'DW-LFR-BLK-44', colorName: 'Ink Black', colorHex: '#121110', size: 'EU 44', stock: 1, priceKobo: 8800000 }
    ]
  },
  {
    id: 'prod-005',
    slug: 'mercerized-heavyweight-essential-tee',
    name: 'Mercerized Heavyweight Essential Tee',
    subtitle: 'Silky smooth 260 GSM organic long-staple cotton',
    category: 'Essentials',
    description:
      'The foundational layer of the wardrobe. Double mercerized for a lustrous hand-feel and non-shrinking drape. Reinforced rib collar that holds shape over seasons of wear.',
    fabricDetails: [
      '100% Mercerized Long-Staple Egyptian Cotton (260 GSM)',
      'Bound collar with interior herringbone neck tape',
      'Straight cut side hem with reinforced bar tacks'
    ],
    careInstructions: [
      'Machine wash cold on gentle cycle',
      'Line dry in shade, warm iron if desired'
    ],
    basePriceKobo: 2600000, // ₦26,000
    isAvailable: true,
    isFeatured: false,
    isNewArrival: true,
    images: [
      { id: 'img-5-1', url: HERO_CAMPAIGN_IMG, alt: 'Mercerized Essential Tee layered under tailoring', isPrimary: true, order: 1 }
    ],
    variants: [
      { id: 'var-5-s-white', sku: 'DW-TEE-WHT-S', colorName: 'Chalk White', colorHex: '#FBFBFA', size: 'S', stock: 12, priceKobo: 2600000 },
      { id: 'var-5-m-white', sku: 'DW-TEE-WHT-M', colorName: 'Chalk White', colorHex: '#FBFBFA', size: 'M', stock: 8, priceKobo: 2600000 },
      { id: 'var-5-l-white', sku: 'DW-TEE-WHT-L', colorName: 'Chalk White', colorHex: '#FBFBFA', size: 'L', stock: 10, priceKobo: 2600000 },
      { id: 'var-5-xl-white', sku: 'DW-TEE-WHT-XL', colorName: 'Chalk White', colorHex: '#FBFBFA', size: 'XL', stock: 5, priceKobo: 2600000 }
    ]
  },
  {
    id: 'prod-006',
    slug: 'sculpted-minimalist-leather-tote',
    name: 'Sculpted Minimalist Leather Tote',
    subtitle: 'Raw-edge construction with structured base and brass hardware',
    category: 'Accessories',
    description:
      'Seamlessly transitions from studio meetings to travel. Crafted from unlined semi-vegetable tanned leather with raw edge-painted finishing and solid brass hardware studs.',
    fabricDetails: [
      'Full-Grain Semi-Vegetable Tanned Leather',
      'Solid antique brass rivets',
      'Internal hanging leather zip pocket and key fob leash',
      'Accommodates up to 16-inch laptops'
    ],
    careInstructions: [
      'Condition with organic leather balm twice a year',
      'Avoid prolonged direct water exposure'
    ],
    basePriceKobo: 6800000, // ₦68,000
    isAvailable: true,
    isFeatured: false,
    isNewArrival: false,
    images: [
      { id: 'img-6-1', url: LOOK_EDITORIAL_IMG, alt: 'Sculpted Minimalist Leather Tote held by model', isPrimary: true, order: 1 }
    ],
    variants: [
      { id: 'var-6-os-onyx', sku: 'DW-TOT-BLK-OS', colorName: 'Matte Onyx', colorHex: '#1A1918', size: 'One Size', stock: 5, priceKobo: 6800000 }
    ]
  }
];

// Signature Look: The Lagos Atelier Ensemble
export const SIGNATURE_LOOK: Look = {
  id: 'look-001',
  slug: 'lagos-atelier-ensemble',
  title: 'Look 01: The Lagos Atelier Ensemble',
  subtitle: 'A study in fluid volume, structured outerwear, and sharp leather craft.',
  description:
    'Our signature silhouette pairs the expansive drape of the Heritage Trench in Muted Olive with forward-pleated wool trousers and grounded by mirror-shine calfskin penny loafers. Styled for warm editorial ease and effortless movement.',
  editorialImageUrl: LOOK_EDITORIAL_IMG,
  pieces: [
    {
      id: 'piece-1',
      product: PRODUCTS[2], // Heritage Trench
      defaultVariantId: 'var-3-m-olive',
      selectedVariantId: 'var-3-m-olive',
      included: true,
      isSoldOut: false
    },
    {
      id: 'piece-2',
      product: PRODUCTS[1], // Pleated Trousers
      defaultVariantId: 'var-2-32-olive',
      selectedVariantId: 'var-2-32-olive',
      included: true,
      isSoldOut: false
    },
    {
      id: 'piece-3',
      product: PRODUCTS[3], // Loafers
      defaultVariantId: 'var-4-42-black',
      selectedVariantId: 'var-4-42-black',
      included: true,
      isSoldOut: false
    }
  ]
};

// Initial Cart items (pre-populated to demonstrate bag state)
export const INITIAL_CART_ITEMS = [
  {
    id: 'cart-item-1',
    productId: PRODUCTS[0].id,
    variantId: PRODUCTS[0].variants[1].id,
    productName: PRODUCTS[0].name,
    productImage: PRODUCTS[0].images[0].url,
    colorName: PRODUCTS[0].variants[1].colorName,
    size: PRODUCTS[0].variants[1].size,
    unitPriceKobo: PRODUCTS[0].variants[1].priceKobo,
    quantity: 1,
    maxStock: PRODUCTS[0].variants[1].stock
  }
];

// Initial Saved / Wishlist items
export const INITIAL_SAVED_PRODUCT_IDS = ['prod-001', 'prod-004'];

// Demo Orders for Order History & Order Detail drilldown
export const DEMO_ORDERS: Order[] = [
  {
    id: 'ord-8841',
    orderReference: 'DW-2026-8841',
    createdAt: '11 Nov 2026, 09:14 AM',
    status: 'processing',
    subtotalKobo: 12000000,
    shippingKobo: 500000, // ₦5,000 express delivery in Lagos
    totalKobo: 12500000, // ₦125,000
    itemCount: 2,
    shippingAddress: {
      fullName: 'Oluwaseun Diran',
      street: '14 Alexander Avenue, Ikoyi',
      city: 'Lagos',
      state: 'Lagos State',
      country: 'Nigeria',
      phone: '+234 803 456 7890'
    },
    deliveryMethod: 'Lagos Priority Courier (1–2 Business Days)',
    paymentMethod: 'Demo Payment (Secured CodeAlpha Gateway)',
    items: [
      {
        id: 'ord-item-1',
        productId: 'prod-001',
        variantId: 'var-1-m-ivory',
        productName: 'Atelier Double-Breasted Linen Blazer',
        colorName: 'Warm Ivory',
        size: 'M',
        priceAtPurchaseKobo: 7800000,
        quantity: 1,
        subtotalKobo: 7800000,
        image: PRODUCT_BLAZER_IMG
      },
      {
        id: 'ord-item-2',
        productId: 'prod-002',
        variantId: 'var-2-32-charcoal',
        productName: 'Pleated Wide-Leg Wool-Blend Trousers',
        colorName: 'Deep Charcoal',
        size: '32',
        priceAtPurchaseKobo: 4200000,
        quantity: 1,
        subtotalKobo: 4200000,
        image: PRODUCT_TROUSERS_IMG
      }
    ]
  },
  {
    id: 'ord-7219',
    orderReference: 'DW-2026-7219',
    createdAt: '28 Oct 2026, 03:45 PM',
    status: 'delivered',
    subtotalKobo: 28500000,
    shippingKobo: 0, // Free shipping for full outfit look
    totalKobo: 28500000, // ₦285,000
    itemCount: 3,
    shippingAddress: {
      fullName: 'Oluwaseun Diran',
      street: '14 Alexander Avenue, Ikoyi',
      city: 'Lagos',
      state: 'Lagos State',
      country: 'Nigeria',
      phone: '+234 803 456 7890'
    },
    deliveryMethod: 'Complimentary White-Glove Courier',
    paymentMethod: 'Demo Payment (Secured CodeAlpha Gateway)',
    items: [
      {
        id: 'ord-item-3',
        productId: 'prod-003',
        variantId: 'var-3-m-olive',
        productName: 'Heritage Trench Utility Overcoat',
        colorName: 'Muted Olive',
        size: 'M',
        priceAtPurchaseKobo: 14500000,
        quantity: 1,
        subtotalKobo: 14500000,
        image: LOOK_EDITORIAL_IMG
      },
      {
        id: 'ord-item-4',
        productId: 'prod-002',
        variantId: 'var-2-32-olive',
        productName: 'Pleated Wide-Leg Wool-Blend Trousers',
        colorName: 'Muted Olive',
        size: '32',
        priceAtPurchaseKobo: 5200000,
        quantity: 1,
        subtotalKobo: 5200000,
        image: PRODUCT_TROUSERS_IMG
      },
      {
        id: 'ord-item-5',
        productId: 'prod-004',
        variantId: 'var-4-42-black',
        productName: 'Polished Calfskin Penny Loafer',
        colorName: 'Ink Black',
        size: 'EU 42',
        priceAtPurchaseKobo: 8800000,
        quantity: 1,
        subtotalKobo: 8800000,
        image: PRODUCT_LOAFERS_IMG
      }
    ]
  }
];

export const formatNaira = (kobo: number): string => {
  const naira = Math.floor(kobo / 100);
  return '₦' + naira.toLocaleString('en-NG');
};
