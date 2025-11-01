import React, { useMemo, useState } from "react";

const PRODUCTS = [
  {
    id: "modern-moroccan-beige",
    title: "Modern Moroccan Beige Rug",
    basePrice: 149,
    thumbnail:
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "scandi-lines-gray",
    title: "Scandi Lines Gray Rug",
    basePrice: 179,
    thumbnail:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "terra-washable-ocher",
    title: "Terra Washable Ocher Rug",
    basePrice: 199,
    thumbnail:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];

const SIZES = ["2x3", "5x7", "8x10", "9x12"];
const SIZE_PRICING = { "2x3": 0, "5x7": 50, "8x10": 120, "9x12": 200 };
const PADS = ["Classic", "Cushioned"];
const PAD_PRICING = { Classic: 0, Cushioned: 30 };

function currency(n) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
}

function Section({ title, children, subtitle }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="text-neutral-500 mt-1">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Nav({ onNavigate, cartCount }) {
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate("home")} className="text-xl font-bold">YourBrand</button>
        <nav className="hidden md:flex gap-6 text-sm">
          <button onClick={() => onNavigate("shop")} className="hover:underline">Shop</button>
          <button onClick={() => onNavigate("how")} className="hover:underline">How it works</button>
          <button onClick={() => onNavigate("account")} className="hover:underline">Account</button>
          <button onClick={() => onNavigate("track")} className="hover:underline">Order tracking</button>
        </nav>
        <button onClick={() => onNavigate("cart")} className="relative rounded-full border px-4 py-2 text-sm">
          Cart {cartCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center rounded-full text-xs px-2 py-0.5 bg-black text-white">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}

function Hero({ onStartBuild }) {
  return (
    <div className="bg-neutral-50">
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">Washable Rugs. Designed for Real Life.</h1>
          <p className="text-neutral-600 mt-4">Replicating the smooth Ruggable-style UX with your brand’s look & feel.</p>
          <div className="mt-6 flex gap-3">
            <button onClick={onStartBuild} className="rounded-xl px-5 py-3 bg-black text-white">Build Your Rug</button>
            <a href="#best" className="rounded-xl px-5 py-3 border">Shop Best Sellers</a>
          </div>
          <ul className="mt-6 text-sm text-neutral-600 grid grid-cols-3 gap-2">
            <li>🧼 Washable</li>
            <li>🐾 Pet‑friendly</li>
            <li>🧲 Non‑slip</li>
          </ul>
        </div>
        <div className="aspect-video rounded-2xl overflow-hidden shadow">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1600585154154-1e47c0b9420c?q=80&w=1600&auto=format&fit=crop" alt="Room preview"/>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, onConfigure }) {
  return (
    <div className="rounded-2xl border overflow-hidden hover:shadow transition">
      <img src={product.thumbnail} alt="" className="h-56 w-full object-cover"/>
      <div className="p-4">
        <h3 className="font-medium">{product.title}</h3>
        <p className="text-sm text-neutral-500">From {currency(product.basePrice)}</p>
        <button onClick={() => onConfigure(product)} className="mt-3 w-full rounded-xl border px-4 py-2">Configure</button>
      </div>
    </div>
  );
}

function BestSellers({ onConfigure }) {
  return (
    <Section title="Best Sellers" subtitle="A few starter SKUs for the prototype" >
      <div id="best" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map(p => <ProductCard key={p.id} product={p} onConfigure={onConfigure} />)}
      </div>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section title="How it works" subtitle="Same steps users expect from Ruggable">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {title:"Choose Design", text:"Pick a style and size."},
          {title:"Select Rug Pad", text:"Classic or Cushioned."},
          {title:"Delivered", text:"Fast shipping & easy returns."},
        ].map((s,i)=> (
          <div key={i} className="rounded-2xl border p-6">
            <div className="text-2xl">{i+1}.</div>
            <div className="font-medium mt-2">{s.title}</div>
            <div className="text-neutral-600 text-sm mt-1">{s.text}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Gallery({ images }) {
  const [idx, setIdx] = useState(0);
  return (
    <div>
      <div className="aspect-video rounded-2xl overflow-hidden border">
        <img src={images[idx]} alt="" className="w-full h-full object-cover"/>
      </div>
      <div className="flex gap-3 mt-3 overflow-x-auto">
        {images.map((src,i)=> (
          <button key={i} onClick={()=>setIdx(i)} className={`h-16 w-24 rounded-lg overflow-hidden border ${i===idx?"ring-2 ring-black":""}`}>
            <img src={src} alt="" className="w-full h-full object-cover"/>
          </button>
        ))}
      </div>
    </div>
  );
}

function Configurator({ product, onAdd }) {
  const [size, setSize] = useState("5x7");
  const [pad, setPad] = useState("Classic");

  const price = useMemo(() => product.basePrice + SIZE_PRICING[size] + PAD_PRICING[pad], [product, size, pad]);

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <Gallery images={product.images} />
      <div>
        <h2 className="text-2xl font-semibold">{product.title}</h2>
        <p className="text-neutral-500 mt-1">Washable • Non‑slip • Pet‑friendly</p>
        <div className="text-3xl mt-4">{currency(price)}</div>

        <div className="mt-6 space-y-5">
          <div>
            <div className="text-sm font-medium mb-2">Size</div>
            <div className="grid grid-cols-4 gap-2">
              {SIZES.map(s => (
                <button key={s} onClick={()=>setSize(s)} className={`rounded-xl border px-3 py-2 text-sm ${size===s?"bg-black text-white":""}`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Rug Pad</div>
            <div className="flex gap-2">
              {PADS.map(p => (
                <button key={p} onClick={()=>setPad(p)} className={`rounded-xl border px-3 py-2 text-sm ${pad===p?"bg-black text-white":""}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={()=>onAdd({ productId: product.id, title: product.title, size, pad, price, qty:1 })} className="rounded-xl px-5 py-3 bg-black text-white">Add to Cart</button>
          <button className="rounded-xl px-5 py-3 border">Save for later</button>
        </div>

        <div className="mt-8 rounded-2xl border p-4 text-sm text-neutral-600">
          <div className="font-medium text-neutral-800 mb-2">What’s included</div>
          Rug cover + selected pad. Machine washable cover, spill‑resistant, low pile height.
        </div>
      </div>
    </div>
  );
}

function Cart({ items, onUpdateQty, onRemove, onCheckout }) {
  const subtotal = items.reduce((s,i)=> s + i.price * i.qty, 0);
  return (
    <Section title="Your Cart" subtitle="Prototype cart with dynamic totals">
      {items.length===0 ? (
        <div className="text-neutral-500">Your cart is empty.</div>
      ):(
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((it,idx)=> (
              <div key={idx} className="rounded-2xl border p-4 flex items-center gap-4">
                <div className="h-20 w-28 rounded-lg overflow-hidden border bg-neutral-100"/>
                <div className="flex-1">
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-neutral-500">{it.size} • {it.pad}</div>
                  <div className="text-sm mt-2">Qty: 
                    <select className="ml-2 border rounded px-2 py-1" value={it.qty} onChange={e=>onUpdateQty(idx, parseInt(e.target.value))}>
                      {[1,2,3,4,5].map(n=> <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{currency(it.price * it.qty)}</div>
                  <button onClick={()=>onRemove(idx)} className="text-sm text-red-600 mt-1">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border p-6 h-fit">
            <div className="flex justify-between"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
            <div className="flex justify-between text-neutral-500 text-sm mt-1"><span>Shipping</span><span>Calculated at checkout</span></div>
            <hr className="my-4"/>
            <button onClick={onCheckout} className="w-full rounded-xl bg-black text-white px-4 py-3">Checkout</button>
            <p className="text-xs text-neutral-500 mt-2">(Prototype) Secure checkout & payment gateway placeholder.</p>
          </div>
        </div>
      )}
    </Section>
  );
}

function Account() {
  return (
    <Section title="Account" subtitle="Customer dashboard sample">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-6">
          <div className="font-medium">Order History</div>
          <ul className="mt-3 text-sm text-neutral-600">
            <li>#1001 • Delivered • Modern Moroccan Beige 5x7 Classic</li>
            <li>#1000 • Returned • Scandi Lines Gray 2x3 Cushioned</li>
          </ul>
        </div>
        <div className="rounded-2xl border p-6">
          <div className="font-medium">Address Book</div>
          <p className="text-sm text-neutral-600 mt-2">Add / edit saved addresses (prototype).</p>
        </div>
      </div>
    </Section>
  );
}

function Tracking() {
  return (
    <Section title="Order Tracking" subtitle="Enter an order number to simulate tracking">
      <div className="rounded-2xl border p-6 max-w-xl">
        <label className="text-sm">Order Number</label>
        <input className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="#1001"/>
        <button className="mt-3 rounded-xl border px-4 py-2">Track</button>
        <div className="text-sm text-neutral-600 mt-4">Status: In Transit • ETA: 2–3 days (mock).</div>
      </div>
    </Section>
  );
}

function Footer(){
  return (
    <footer className="border-t mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-neutral-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} YourBrand</div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [route, setRoute] = useState("home");
  const [configProduct, setConfigProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const cartCount = cart.reduce((s,i)=> s + i.qty, 0);

  const addToCart = (line) => {
    setCart(prev=> [...prev, line]);
    setRoute("cart");
  };
  const updateQty = (idx, qty) => setCart(prev => prev.map((l,i)=> i===idx? {...l, qty}: l));
  const removeLine = (idx) => setCart(prev => prev.filter((_,i)=> i!==idx));

  return (
    <div className="font-sans text-neutral-900">
      <Nav onNavigate={(r)=>setRoute(r)} cartCount={cartCount} />

      {route === "home" && (
        <>
          <Hero onStartBuild={()=>{ setConfigProduct(PRODUCTS[0]); setRoute("config"); }} />
          <BestSellers onConfigure={(p)=>{ setConfigProduct(p); setRoute("config"); }} />
          <HowItWorks />
        </>
      )}

      {route === "shop" && (
        <Section title="All Products" subtitle="Tap any card to configure">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map(p => <ProductCard key={p.id} product={p} onConfigure={(prod)=>{ setConfigProduct(prod); setRoute("config"); }} />)}
          </div>
        </Section>
      )}

      {route === "how" && <HowItWorks />}

      {route === "config" && configProduct && (
        <Section title="Build Your Rug" subtitle="Live pricing + pad selection">
          <Configurator product={configProduct} onAdd={addToCart} />
        </Section>
      )}

      {route === "cart" && (
        <Cart items={cart} onUpdateQty={updateQty} onRemove={removeLine} onCheckout={()=>alert("Prototype checkout – integrate Stripe/Shopify next.")} />
      )}

      {route === "account" && <Account />}
      {route === "track" && <Tracking />}

      <Footer />
    </div>
  );
}
