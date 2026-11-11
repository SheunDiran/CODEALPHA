import React, { useState } from 'react';
import { X, Database, Route, FileCode, Image as ImageIcon, CheckCircle, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'routes' | 'schema' | 'api' | 'imagery'>('routes');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#FAF7F2] dark:bg-[#141312] text-[#181716] dark:text-[#E8E4DA] rounded-2xl shadow-2xl border border-[#E8E4DA] dark:border-[#2A2724] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DA] dark:border-[#2A2724] bg-white/70 dark:bg-[#1A1917]/70 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif italic text-xl text-[#4E563E] dark:text-[#9BAA7C]">Architecture Blueprint</span>
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-[#4E563E]/10 text-[#4E563E] dark:text-[#9BAA7C]">Phase 1 Specification</span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              CodeAlpha Task 1: Diran Wears Full-Stack Production Specification
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close architecture modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8E4DA] dark:border-[#2A2724] px-6 bg-[#FAF7F2] dark:bg-[#141312] overflow-x-auto">
          {[
            { id: 'routes', label: 'Route Map & Navigation Flow', icon: Route },
            { id: 'schema', label: 'PostgreSQL Relational Schema', icon: Database },
            { id: 'api', label: 'REST API Contract & Auth', icon: FileCode },
            { id: 'imagery', label: 'Photography & Asset Specifications', icon: ImageIcon }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-[#4E563E] text-[#4E563E] dark:text-[#9BAA7C] dark:border-[#9BAA7C] font-semibold'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* TAB 1: ROUTE MAP */}
          {activeTab === 'routes' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724]">
                <h4 className="font-serif text-lg mb-2 text-[#181716] dark:text-white">Storefront Information Hierarchy & Route Flow</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  Diran Wears enforces an intentional, minimal routing strategy designed for frictionless mobile discovery, persistent shopping carts across sign-in redirects, and transactional checkout integrity.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724]">
                    <div className="text-xs font-semibold text-[#4E563E] dark:text-[#9BAA7C] uppercase tracking-wider mb-2">Public & Catalog Routes</div>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-start gap-2">
                        <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-neutral-800 dark:text-neutral-200">/welcome</code>
                        <span className="text-neutral-600 dark:text-neutral-400">Intro campaign modal / gateway. Rendered once per browser via localStorage cookie flag; deep links bypass this directly.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-neutral-800 dark:text-neutral-200">/</code>
                        <span className="text-neutral-600 dark:text-neutral-400">Home view with editorial campaign hero, seasonal drops, curated categories, and signature Shop the Look spotlight.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-neutral-800 dark:text-neutral-200">/shop</code>
                        <span className="text-neutral-600 dark:text-neutral-400">Full catalog with query-preserved state: <span className="font-mono">?cat=tailoring&size=32&sort=price-desc</span>. Search & multi-facet filtering.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-neutral-800 dark:text-neutral-200">/product/:slug</code>
                        <span className="text-neutral-600 dark:text-neutral-400">Product detail page (PDP) with high-res gallery, variant selector, live stock counters, fit accordion, and sticky mobile purchase CTA.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-neutral-800 dark:text-neutral-200">/look/:slug</code>
                        <span className="text-neutral-600 dark:text-neutral-400">Signature Shop the Look suite: styled full-body editorial with interactive outfit piece variant configuration and aggregate bundle addition.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-neutral-800 dark:text-neutral-200">/saved</code>
                        <span className="text-neutral-600 dark:text-neutral-400">Customer saved items wishlist. Synced to guest local storage and merged to customer profile upon login.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724]">
                    <div className="text-xs font-semibold text-[#4E563E] dark:text-[#9BAA7C] uppercase tracking-wider mb-2">Commerce & Account Routes</div>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-start gap-2">
                        <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-neutral-800 dark:text-neutral-200">/bag</code>
                        <span className="text-neutral-600 dark:text-neutral-400">Bag drawer overlay & dedicated full-page cart. Steppers for quantity, remove confirmation, shipping threshold progress.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-neutral-800 dark:text-neutral-200">/login & /register</code>
                        <span className="text-neutral-600 dark:text-neutral-400">Secure auth. Supports <span className="font-mono">?redirect=/checkout</span> so carts are retained and merged seamlessly into user account.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-neutral-800 dark:text-neutral-200">/checkout</code>
                        <span className="text-neutral-600 dark:text-neutral-400">3-Step transactional checkout: Shipping address (Lagos/Nigeria) &gt; Delivery method &gt; Demo Payment Authorization (zero credit card capture).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-neutral-800 dark:text-neutral-200">/order/confirmation/:ref</code>
                        <span className="text-neutral-600 dark:text-neutral-400">Order success page with unique reference (e.g. DW-2026-8841), line-item receipt snapshot, estimated delivery dates, and clear CTAs.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-neutral-800 dark:text-neutral-200">/account/orders</code>
                        <span className="text-neutral-600 dark:text-neutral-400">Protected order history listing all past orders with status chips, date, and item breakdown.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-neutral-800 dark:text-neutral-200">/account/orders/:id</code>
                        <span className="text-neutral-600 dark:text-neutral-400">Order detail view with parcel tracking timeline, delivery address, immutable historical line item prices, and invoice receipt download.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* State Transition Matrix */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724]">
                <h4 className="font-serif text-base mb-2 text-[#181716] dark:text-white">Interactive State Transition Specifications</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#E8E4DA] dark:border-[#2A2724] text-neutral-500">
                        <th className="py-2 pr-4 font-semibold">State Mode</th>
                        <th className="py-2 pr-4 font-semibold">Trigger / Condition</th>
                        <th className="py-2 pr-4 font-semibold">UX Presentation</th>
                        <th className="py-2 font-semibold">Recovery Mechanism</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E4DA]/50 dark:divide-[#2A2724]/50">
                      <tr>
                        <td className="py-2.5 pr-4 font-medium text-amber-700 dark:text-amber-400">Loading State</td>
                        <td className="py-2.5 pr-4 text-neutral-600 dark:text-neutral-400">API fetch in transit (&gt;50ms)</td>
                        <td className="py-2.5 pr-4 text-neutral-600 dark:text-neutral-400">Warm ivory shimmer skeleton matching exact layout geometry</td>
                        <td className="py-2.5 text-neutral-600 dark:text-neutral-400">Instant replace with zero layout shift (CLS 0.0)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4 font-medium text-blue-700 dark:text-blue-400">Empty State</td>
                        <td className="py-2.5 pr-4 text-neutral-600 dark:text-neutral-400">Bag count = 0, Wishlist = 0, or zero search matches</td>
                        <td className="py-2.5 pr-4 text-neutral-600 dark:text-neutral-400">Editorial illustration, empathetic copy, and immediate "Explore New Arrivals" CTA</td>
                        <td className="py-2.5 text-neutral-600 dark:text-neutral-400">One-click jump back into curated collections</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4 font-medium text-rose-700 dark:text-rose-400">Error State</td>
                        <td className="py-2.5 pr-4 text-neutral-600 dark:text-neutral-400">Network fault or validation failure</td>
                        <td className="py-2.5 pr-4 text-neutral-600 dark:text-neutral-400">Contained inline banner with retry action; form field level error messages</td>
                        <td className="py-2.5 text-neutral-600 dark:text-neutral-400">Preserve all form input without wiping customer data</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4 font-medium text-purple-700 dark:text-purple-400">Sold-Out State</td>
                        <td className="py-2.5 pr-4 text-neutral-600 dark:text-neutral-400">Variant inventory stock = 0</td>
                        <td className="py-2.5 pr-4 text-neutral-600 dark:text-neutral-400">Strikethrough size selector, disabled "Add to Bag", waitlist notification prompt</td>
                        <td className="py-2.5 text-neutral-600 dark:text-neutral-400">Recommend available sizes or alternative colors</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4 font-medium text-emerald-700 dark:text-emerald-400">Checkout Recovery</td>
                        <td className="py-2.5 pr-4 text-neutral-600 dark:text-neutral-400">Stock decremented by concurrent user during checkout session</td>
                        <td className="py-2.5 pr-4 text-neutral-600 dark:text-neutral-400">Transactional alert dialog highlighting exact unavailable piece and recalculated total</td>
                        <td className="py-2.5 text-neutral-600 dark:text-neutral-400">Keep remainder of bag intact; customer confirms updated order</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCHEMA */}
          {activeTab === 'schema' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724]">
                <h4 className="font-serif text-lg mb-2 text-[#181716] dark:text-white">PostgreSQL Relational Schema Architecture</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                  Normalized relational database schema tracking immutable historical orders, multi-variant inventory, image ordering, and user session management.
                </p>

                <div className="space-y-4 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724]">
                    <div className="text-xs font-bold text-[#4E563E] dark:text-[#9BAA7C] font-sans mb-1">Table 1: users & sessions</div>
                    <pre className="text-[11px] leading-relaxed text-neutral-700 dark:text-neutral-300 overflow-x-auto">
{`CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  default_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id VARCHAR(128) PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  guest_cart_id UUID,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  data JSONB
);`}
                    </pre>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724]">
                    <div className="text-xs font-bold text-[#4E563E] dark:text-[#9BAA7C] font-sans mb-1">Table 2: products, variants & product_images</div>
                    <pre className="text-[11px] leading-relaxed text-neutral-700 dark:text-neutral-300 overflow-x-auto">
{`CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  fabric_details JSONB DEFAULT '[]'::jsonb,
  care_instructions JSONB DEFAULT '[]'::jsonb,
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku VARCHAR(100) UNIQUE NOT NULL,
  color_name VARCHAR(100) NOT NULL,
  color_hex VARCHAR(20) NOT NULL,
  size VARCHAR(50) NOT NULL,
  price_kobo INTEGER NOT NULL CHECK (price_kobo > 0), -- Minor units in kobo
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE
);`}
                    </pre>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724]">
                    <div className="text-xs font-bold text-[#4E563E] dark:text-[#9BAA7C] font-sans mb-1">Table 3: looks & look_items (Shop the Look Bundle)</div>
                    <pre className="text-[11px] leading-relaxed text-neutral-700 dark:text-neutral-300 overflow-x-auto">
{`CREATE TABLE looks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  description TEXT,
  editorial_image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE look_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  look_id UUID NOT NULL REFERENCES looks(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  default_variant_id UUID REFERENCES product_variants(id),
  display_order INTEGER NOT NULL DEFAULT 0
);`}
                    </pre>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724]">
                    <div className="text-xs font-bold text-[#4E563E] dark:text-[#9BAA7C] font-sans mb-1">Table 4: orders & immutable order_items</div>
                    <pre className="text-[11px] leading-relaxed text-neutral-700 dark:text-neutral-300 overflow-x-auto">
{`CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_reference VARCHAR(50) UNIQUE NOT NULL, -- e.g. DW-2026-8841
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  guest_email VARCHAR(255),
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, processing, dispatched, delivered
  subtotal_kobo INTEGER NOT NULL,
  shipping_kobo INTEGER NOT NULL DEFAULT 0,
  total_kobo INTEGER NOT NULL,
  shipping_address JSONB NOT NULL,
  delivery_method VARCHAR(100) NOT NULL,
  payment_method VARCHAR(100) NOT NULL,
  payment_reference VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crucial: Snapshot historical product & variant details so catalog edits do not alter historical receipts!
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  product_name_snapshot VARCHAR(255) NOT NULL,
  color_name_snapshot VARCHAR(100) NOT NULL,
  size_snapshot VARCHAR(50) NOT NULL,
  price_at_purchase_kobo INTEGER NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  subtotal_kobo INTEGER NOT NULL,
  image_url_snapshot TEXT
);`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: API CONTRACT */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724]">
                <h4 className="font-serif text-lg mb-2 text-[#181716] dark:text-white">RESTful API Contract Specifications</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                  Full-stack endpoints serving catalog queries, inventory reservation, shopping cart synchronization, and atomic checkout order processing.
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg border border-[#E8E4DA] dark:border-[#2A2724] bg-[#FAF7F2] dark:bg-[#121110]">
                    <div className="flex items-center justify-between font-mono mb-1">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">GET /api/products</span>
                      <span className="text-neutral-500">Public · Cached</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Query params: <code className="text-neutral-800 dark:text-neutral-200">category</code>, <code className="text-neutral-800 dark:text-neutral-200">size</code>, <code className="text-neutral-800 dark:text-neutral-200">color</code>, <code className="text-neutral-800 dark:text-neutral-200">minPrice</code>, <code className="text-neutral-800 dark:text-neutral-200">maxPrice</code>, <code className="text-neutral-800 dark:text-neutral-200">inStockOnly</code>, <code className="text-neutral-800 dark:text-neutral-200">sort</code>.
                    </p>
                    <div className="text-[11px] text-neutral-500 mt-1">Returns array of products with image sets and active variant stock tallies.</div>
                  </div>

                  <div className="p-3 rounded-lg border border-[#E8E4DA] dark:border-[#2A2724] bg-[#FAF7F2] dark:bg-[#121110]">
                    <div className="flex items-center justify-between font-mono mb-1">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">GET /api/products/:slug</span>
                      <span className="text-neutral-500">Public</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Returns complete PDP payload: product specifications, full image gallery order, all variant inventory stock counts, and related styling items.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-[#E8E4DA] dark:border-[#2A2724] bg-[#FAF7F2] dark:bg-[#121110]">
                    <div className="flex items-center justify-between font-mono mb-1">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">GET /api/looks/:slug</span>
                      <span className="text-neutral-500">Public</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Returns signature Look with editorial photography, child outfit pieces, variant options, and bundle price calculations.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-[#E8E4DA] dark:border-[#2A2724] bg-[#FAF7F2] dark:bg-[#121110]">
                    <div className="flex items-center justify-between font-mono mb-1">
                      <span className="text-amber-700 dark:text-amber-400 font-bold">POST /api/cart/items</span>
                      <span className="text-neutral-500">Session/Cookie Bound</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Body: <code className="text-neutral-800 dark:text-neutral-200 font-mono">&#123; variantId: string, quantity: number &#125;</code>. Validates stock in real time before incrementing bag counter.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-[#E8E4DA] dark:border-[#2A2724] bg-[#FAF7F2] dark:bg-[#121110]">
                    <div className="flex items-center justify-between font-mono mb-1">
                      <span className="text-amber-700 dark:text-amber-400 font-bold">POST /api/cart/bundle</span>
                      <span className="text-neutral-500">Session/Cookie Bound</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Body: <code className="text-neutral-800 dark:text-neutral-200 font-mono">&#123; lookId: string, variantIds: string[] &#125;</code>. Signature Shop the Look atomic bundle addition. Validates all pieces simultaneously.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-[#E8E4DA] dark:border-[#2A2724] bg-[#FAF7F2] dark:bg-[#121110]">
                    <div className="flex items-center justify-between font-mono mb-1">
                      <span className="text-rose-700 dark:text-rose-400 font-bold">POST /api/orders/checkout</span>
                      <span className="text-neutral-500">Atomic Transaction</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Executes transactional <code className="font-mono">BEGIN...COMMIT</code> block. Decrements inventory with <code className="font-mono">SELECT ... FOR UPDATE</code>. If any piece is exhausted, transaction rolls back cleanly with HTTP 409 and checkout recovery payload.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: IMAGERY & ART DIRECTION */}
          {activeTab === 'imagery' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white dark:bg-[#1A1917] border border-[#E8E4DA] dark:border-[#2A2724]">
                <h4 className="font-serif text-lg mb-2 text-[#181716] dark:text-white">Editorial Art Direction & Visual Asset Catalog</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                  Diran Wears imagery follows a strict high-fashion editorial standard: warm architectural sunlight, travertine and concrete textures, authentic Nigerian editorial models, and zero generic placeholder boxes.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724]">
                    <div className="text-xs font-semibold text-[#4E563E] dark:text-[#9BAA7C] uppercase tracking-wider mb-2">Campaign & Lookbook Specifications</div>
                    <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                      <li><strong className="text-neutral-800 dark:text-neutral-200">Aspect Ratio:</strong> 16:9 for Wide Campaign Hero; 3:4 for Signature Full-Body Looks.</li>
                      <li><strong className="text-neutral-800 dark:text-neutral-200">Color Palette Alignment:</strong> Warm ivory flax, deep charcoal, muted olive gabardine.</li>
                      <li><strong className="text-neutral-800 dark:text-neutral-200">Lighting:</strong> Soft directional morning sunlight, minimal harsh flash, authentic fabric draping.</li>
                      <li><strong className="text-neutral-800 dark:text-neutral-200">Performance:</strong> Generated WebP with fallback, explicit width/height to avoid layout shifting (CLS 0.0).</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#121110] border border-[#E8E4DA] dark:border-[#2A2724]">
                    <div className="text-xs font-semibold text-[#4E563E] dark:text-[#9BAA7C] uppercase tracking-wider mb-2">PDP & Footwear Asset Standards</div>
                    <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                      <li><strong className="text-neutral-800 dark:text-neutral-200">Product Studio Backdrop:</strong> Solid neutral travertine or warm off-white seamless cyclorama.</li>
                      <li><strong className="text-neutral-800 dark:text-neutral-200">Macro Details:</strong> Horn button stitches, hand-pleated waistbands, mirror-polished calfskin luster.</li>
                      <li><strong className="text-neutral-800 dark:text-neutral-200">Consistency:</strong> Same model and lighting direction maintained between lookbook and individual garment shots.</li>
                      <li><strong className="text-neutral-800 dark:text-neutral-200">Zero Broken Images:</strong> Built-in fallback container with styled SVG monogram and item title.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#E8E4DA] dark:border-[#2A2724] bg-white/70 dark:bg-[#1A1917]/70 flex items-center justify-between text-xs text-neutral-500">
          <span>CodeAlpha Full Stack Task 1 · Architectural Specification Document</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#4E563E] text-white hover:bg-[#3E4531] font-medium transition-colors"
          >
            Return to Wireframe Review
          </button>
        </div>
      </div>
    </div>
  );
};
