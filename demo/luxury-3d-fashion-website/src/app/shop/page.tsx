import { db } from "@/db";
import { products } from "@/db/schema";
import { seedDatabase } from "@/db/seed";
import { desc } from "drizzle-orm";
import ShopPageClient from "./ShopPageClient";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  await seedDatabase();
  
  const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));
  
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

  return <ShopPageClient products={mapped} />;
}
