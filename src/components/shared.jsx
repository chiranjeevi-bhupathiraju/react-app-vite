import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Search,
  MapPin,
  Menu,
  X,
  Star,
  Leaf,
  ArrowRight,
  RefreshCw,
  User,
  Sun,
  Moon,
} from "lucide-react";
import toast from "react-hot-toast";
import { useStore } from "../context/StoreContext";
import { money } from "../utils/currency";

export const cats = [
  ["Fruits & Vegetables", "??", "groceries"],
  ["Dairy & Eggs", "??", "groceries"],
  ["Bakery", "??", "groceries"],
  ["Meat & Seafood", "??", "groceries"],
  ["Snacks", "??", "groceries"],
  ["Beverages", "??", "groceries"],
  ["Grains & Pulses", "??", "groceries"],
  ["Household", "??", "home-decoration"],
];

export function Header() {
  const s = useStore(),
    [q, setQ] = useState(""),
    [open, setOpen] = useState(false),
    [theme, setTheme] = useState(() => localStorage.getItem("freshcart-theme") || "light");
  const nav = useNavigate();
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("freshcart-theme", theme);
  }, [theme]);
  return (
    <>
      <div className="bg-[#edf7ef] text-[#34714b] text-xs py-2">
        <div className="container flex justify-between">
          <span>Free delivery on orders above ₹499</span>
          <span className="hidden sm:block">
            Fresh picks, delivered daily ✦
          </span>
        </div>
      </div>
      <header className="bg-white border-b border-[#edf0eb] sticky top-0 z-30">
        <div className="container h-[76px] flex items-center gap-5">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
          <Link
            to="/"
            className="font-black text-[26px] tracking-tight text-[#168a55]"
          >
            fresh<span className="text-[#f1a63b]">cart</span>
            <span className="text-[#f1a63b]">.</span>
          </Link>
          <button className="hidden lg:flex items-center gap-2 text-left text-xs border-l pl-5 border-gray-200">
            <MapPin size={18} className="text-[#168a55]" />
            <span>
              <b className="block text-gray-800">Deliver to</b>
              <span className="text-gray-500">Your location</span>
            </span>
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              nav(`/search?q=${encodeURIComponent(q)}`);
            }}
            className="flex-1 flex bg-[#f5f7f3] rounded-xl px-4 h-11 items-center gap-2 max-w-[530px] mx-auto"
          >
            <Search size={18} className="text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search fresh groceries..."
              className="bg-transparent outline-none w-full text-sm"
            />
            <button className="text-xs font-bold text-[#168a55]">Search</button>
          </form>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link to="/wishlist" className="relative p-2" aria-label="Wishlist">
              <Heart size={21} />
              {s.wishlist.length > 0 && (
                <b className="badge">{s.wishlist.length}</b>
              )}
            </Link>
            <Link to="/cart" className="relative p-2" aria-label="Cart">
              <ShoppingCart size={21} />
              {s.cartCount > 0 && <b className="badge">{s.cartCount}</b>}
            </Link>
            <Link
              to={s.user ? "/profile" : "/login"}
              className="hidden sm:flex p-2"
              aria-label="Account"
            >
              <User size={21} />
            </Link>
          </div>
        </div>
        {open && (
          <nav className="md:hidden border-t p-4 grid grid-cols-2 gap-3">
            {[
              ["Shop", "/shop"],
              ["Wishlist", "/wishlist"],
              ["Cart", "/cart"],
              ["Orders", "/orders"],
            ].map(([x, y]) => (
              <Link
                onClick={() => setOpen(false)}
                to={y}
                key={y}
                className="p-3 bg-gray-50 rounded-lg"
              >
                {x}
              </Link>
            ))}
          </nav>
        )}
        <nav className="hidden md:block border-t border-gray-100">
          <div className="container h-10 flex items-center gap-7 text-sm text-gray-600">
            <NavLink to="/shop" className="font-semibold text-[#168a55]">
              Shop
            </NavLink>
            {cats.slice(0, 6).map((c, i) => (
              <Link
                to={`/category/${encodeURIComponent(c[0])}`}
                key={i}
                className="hover:text-[#168a55]"
              >
                {c[0]}
              </Link>
            ))}
            <Link to="/orders" className="ml-auto">
              Orders
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#123d2b] text-white mt-20">
      <div className="container py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="font-black text-2xl text-white">
            fresh<span className="text-[#f1a63b]">cart.</span>
          </div>
          <p className="text-green-100/70 text-sm mt-3">
            Good food, good mood. Your neighborhood grocery store, delivered.
          </p>
        </div>
        <div>
          <b>Shop</b>
          <div className="mt-3 grid gap-2 text-sm text-green-100/70">
            <Link to="/shop">All products</Link>
            <Link to="/wishlist">Your wishlist</Link>
            <Link to="/cart">Shopping cart</Link>
          </div>
        </div>
        <div>
          <b>Account</b>
          <div className="mt-3 grid gap-2 text-sm text-green-100/70">
            <Link to="/profile">My profile</Link>
            <Link to="/addresses">Addresses</Link>
            <Link to="/orders">Order history</Link>
          </div>
        </div>
        <div>
          <b>Freshness, every day</b>
          <p className="mt-3 text-sm text-green-100/70">
            Carefully selected essentials brought right to your door.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-green-100/50">
        © 2025 FreshCart · Demo storefront, powered by DummyJSON
      </div>
    </footer>
  );
}

export function ProductCard({ p }) {
  const s = useStore(),
    fav = s.wishlist.some((x) => x.id === p.id);
  return (
    <article className="group bg-white border border-[#edf0eb] rounded-2xl p-3 hover:shadow-lg hover:shadow-green-900/5 transition relative">
      <button
        onClick={() => {
          s.toggle(p);
          toast.success(fav ? "Removed from wishlist" : "Saved to wishlist");
        }}
        className="absolute right-4 top-4 z-10 bg-white rounded-full p-2 shadow-sm"
        aria-label={fav ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          size={17}
          className={fav ? "fill-rose-500 text-rose-500" : "text-gray-500"}
        />
      </button>
      <Link to={`/product/${p.id}`} className="block">
        <div className="h-40 sm:h-48 bg-[#f8faf6] rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src={p.thumbnail}
            alt={p.title}
            loading="lazy"
            className="product-image w-full h-full object-contain p-3 group-hover:scale-105 transition"
          />
        </div>
        <div className="pt-3">
          <div className="text-[11px] text-gray-400 capitalize">
            {p.displayCategory}
          </div>
          <h3 className="font-semibold text-sm mt-1 line-clamp-2 min-h-10">
            {p.title}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-xs text-amber-500">
            <Star size={13} fill="currentColor" />
            {p.rating.toFixed(1)}
            <span className="text-gray-400 ml-1">
              · {p.stock > 0 ? "In stock" : "Out of stock"}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <b className="text-base">{money(p.price)}</b>
            <del className="text-xs text-gray-400">
              {money(p.price / (1 - p.discountPercentage / 100))}
            </del>
            <span className="text-[10px] text-[#168a55] font-bold">
              -{Math.round(p.discountPercentage)}%
            </span>
          </div>
        </div>
      </Link>
      <button
        disabled={!p.stock}
        onClick={() => {
          s.add(p);
          toast.success(`${p.title} added to cart`);
        }}
        className="mt-3 w-full h-10 rounded-lg bg-[#eaf6ed] hover:bg-[#168a55] hover:text-white text-[#168a55] font-bold text-sm disabled:opacity-50"
      >
        {p.stock ? "Add to cart" : "Out of stock"}
      </button>
    </article>
  );
}

export function ProductGrid({ products }) {
  if (!products.length)
    return (
      <div className="py-20 text-center text-gray-500">
        <div className="text-4xl mb-3">🧺</div>
        <h3 className="font-bold text-gray-800 text-xl">Nothing here yet</h3>
        <p className="mt-2">Try another search or explore all our products.</p>
        <Link className="btn-primary inline-flex mt-5" to="/shop">
          Browse products
        </Link>
      </div>
    );
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}

export function useLoad(loader, deps = []) {
  const [state, setState] = useState({ loading: true, error: "", data: [] }),
    [retry, setRetry] = useState(0);
  useEffect(() => {
    const ctrl = new AbortController();
    setState((s) => ({ ...s, loading: true, error: "" }));
    loader(ctrl.signal)
      .then((data) => setState({ loading: false, error: "", data }))
      .catch((e) => {
        if (e.name !== "AbortError")
          setState({ loading: false, error: e.message, data: [] });
      });
    return () => ctrl.abort();
  }, [retry, ...deps]);
  return { ...state, retry: () => setRetry((x) => x + 1) };
}

export function Loading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="h-72 rounded-2xl bg-gray-100 animate-pulse" />
      ))}
    </div>
  );
}

export function LoadError({ error, retry }) {
  return (
    <div className="py-20 text-center">
      <p className="text-red-600">{error}</p>
      <button onClick={retry} className="btn-primary mt-4">
        <RefreshCw size={16} /> Retry
      </button>
    </div>
  );
}

export function Summary({ s }) {
  return (
    <aside className="bg-white border rounded-2xl p-6 h-fit">
      <h2 className="font-bold text-xl">Order summary</h2>
      <div className="flex justify-between text-sm mt-5">
        <span>Subtotal</span>
        <span>{money(s.subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm mt-3">
        <span>Delivery</span>
        <span>{s.delivery ? money(s.delivery) : "Free"}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        {s.subtotal >= 499
          ? "You unlocked free delivery"
          : "Free delivery on orders over ₹499"}
      </p>
      <div className="border-t mt-5 pt-4 flex justify-between font-bold">
        <span>Total</span>
        <span>{money(s.total)}</span>
      </div>
      <Link to="/checkout" className="btn-primary w-full justify-center mt-5">
        Go to checkout <ArrowRight size={16} />
      </Link>
    </aside>
  );
}

export function Empty({ icon, title, desc, to, action }) {
  return (
    <div className="text-center py-24">
      <div className="text-5xl">{icon}</div>
      <h2 className="font-black text-2xl mt-4">{title}</h2>
      <p className="text-gray-500 mt-2">{desc}</p>
      <Link to={to} className="btn-primary inline-flex mt-6">
        {action}
      </Link>
    </div>
  );
}
