import ProductDetailsClient from "./ProductDetailsClient";

const apiBase = (process.env.API_URL || "http://localhost:8080").replace(/\/+$/, "");

// Dynamic <title> per product — a free SSR/SEO upgrade over the old
// client-rendered page, which always showed the default title.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(
      `${apiBase}/api/v1/product/get-product/${slug}`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    if (data?.product?.name) {
      return { title: `${data.product.name} - WatchWave` };
    }
  } catch {
    // fall through to default title
  }
  return {};
}

export default function ProductPage() {
  return <ProductDetailsClient />;
}
