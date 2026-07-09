import { db } from "@/db";
import { products } from "@/db/schema";
import { seedDatabase } from "@/db/seed";
import { eq } from "drizzle-orm";
import CategoryPageClient from "@/app/components/CategoryPageClient";

export const dynamic = "force-dynamic";

export default async function GownsPage() {
  await seedDatabase();
  const gowns = await db.select().from(products).where(eq(products.category, "gown"));
  
  const mapped = gowns.map(p => ({
    id: p.id, name: p.name, description: p.description, category: p.category,
    price: p.price, originalPrice: p.originalPrice, image: p.image, images: p.images,
    fabric: p.fabric, work: p.work, occasion: p.occasion, rating: p.rating,
    reviewsCount: p.reviewsCount, sizes: p.sizes, colors: p.colors, featured: p.featured, createdAt: p.createdAt
  }));

  return (
    <CategoryPageClient 
      products={mapped}
      title="Gowns & Anarkalis"
      subtitle="Flared royal silhouettes in georgette, chinon silk, and modal fabrics with intricate embroidery for weddings and festive celebrations"
      category="gowns"
      heroImage="https://peachpetals.in/cdn/shop/files/Tiered_Pastel_Anarkali_Gown_with_Embroidered_Bodice.webp?v=1771399184&width=800"
    />
  );
}
