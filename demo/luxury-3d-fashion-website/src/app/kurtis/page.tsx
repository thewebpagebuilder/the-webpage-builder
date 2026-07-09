import { db } from "@/db";
import { products } from "@/db/schema";
import { seedDatabase } from "@/db/seed";
import { eq } from "drizzle-orm";
import CategoryPageClient from "@/app/components/CategoryPageClient";

export const dynamic = "force-dynamic";

export default async function KurtisPage() {
  await seedDatabase();
  const kurtis = await db.select().from(products).where(eq(products.category, "kurti"));
  
  const mapped = kurtis.map(p => ({
    id: p.id, name: p.name, description: p.description, category: p.category,
    price: p.price, originalPrice: p.originalPrice, image: p.image, images: p.images,
    fabric: p.fabric, work: p.work, occasion: p.occasion, rating: p.rating,
    reviewsCount: p.reviewsCount, sizes: p.sizes, colors: p.colors, featured: p.featured, createdAt: p.createdAt
  }));

  return (
    <CategoryPageClient 
      products={mapped}
      title="Kurtis & Palazzo Sets"
      subtitle="Everyday elegance in breathable cotton, viscose, and premium silk blends"
      category="kurtis"
      heroImage="https://peachpetals.in/cdn/shop/files/Azure_Blue_Floral_Print_Kurta_Set_with_Bordered_Dupatta.webp?v=1769596048&width=800"
    />
  );
}
