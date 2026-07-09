import { db } from "@/db";
import { products } from "@/db/schema";
import { seedDatabase } from "@/db/seed";
import { eq } from "drizzle-orm";
import HomePageClient from "./HomePageClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await seedDatabase();

  const allProducts = await db.select().from(products);
  const featuredProducts = await db.select().from(products).where(eq(products.featured, true));

  const mapped = allProducts.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice,
    image: p.image,
    images: p.images,
    fabric: p.fabric,
    work: p.work,
    occasion: p.occasion,
    rating: p.rating,
    reviewsCount: p.reviewsCount,
    sizes: p.sizes,
    colors: p.colors,
    featured: p.featured,
    createdAt: p.createdAt
  }));

  const mappedFeatured = featuredProducts.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice,
    image: p.image,
    images: p.images,
    fabric: p.fabric,
    work: p.work,
    occasion: p.occasion,
    rating: p.rating,
    reviewsCount: p.reviewsCount,
    sizes: p.sizes,
    colors: p.colors,
    featured: p.featured,
    createdAt: p.createdAt
  }));

  return <HomePageClient allProducts={mapped} featuredProducts={mappedFeatured} />;
}
