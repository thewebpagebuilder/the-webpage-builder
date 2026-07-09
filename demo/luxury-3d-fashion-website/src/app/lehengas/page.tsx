import { db } from "@/db";
import { products } from "@/db/schema";
import { seedDatabase } from "@/db/seed";
import { eq } from "drizzle-orm";
import CategoryPageClient from "@/app/components/CategoryPageClient";

export const dynamic = "force-dynamic";

export default async function LehengasPage() {
  await seedDatabase();
  const lehengas = await db.select().from(products).where(eq(products.category, "lehenga"));
  
  const mapped = lehengas.map(p => ({
    id: p.id, name: p.name, description: p.description, category: p.category,
    price: p.price, originalPrice: p.originalPrice, image: p.image, images: p.images,
    fabric: p.fabric, work: p.work, occasion: p.occasion, rating: p.rating,
    reviewsCount: p.reviewsCount, sizes: p.sizes, colors: p.colors, featured: p.featured, createdAt: p.createdAt
  }));

  return (
    <CategoryPageClient 
      products={mapped}
      title="Lehenga Cholis"
      subtitle="Bridal and festive grandeur with zardosi, mirror work, and Banarasi brocade — designed for the modern Indian queen"
      category="lehengas"
      heroImage="https://peachpetals.in/cdn/shop/files/857-2489_2.webp?v=1770894040&width=800"
    />
  );
}
