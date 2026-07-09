import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { seedDatabase } from "@/db/seed";
import { eq, desc } from "drizzle-orm";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await seedDatabase();
  
  const { id } = await params;
  const productId = parseInt(id, 10);
  if (isNaN(productId)) notFound();

  const product = await db.select().from(products).where(eq(products.id, productId)).limit(1);
  if (!product[0]) notFound();

  const productReviews = await db.select()
    .from(reviews)
    .where(eq(reviews.productName, product[0].name))
    .orderBy(desc(reviews.createdAt));

  // Also get related products (same category)
  const related = await db.select()
    .from(products)
    .where(eq(products.category, product[0].category))
    .limit(5);

  const p = product[0];
  const mappedProduct = {
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
    createdAt: p.createdAt,
  };

  const mappedRelated = related
    .filter(r => r.id !== productId)
    .slice(0, 4)
    .map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      category: r.category,
      price: r.price,
      originalPrice: r.originalPrice,
      image: r.image,
      images: r.images,
      fabric: r.fabric,
      work: r.work,
      occasion: r.occasion,
      rating: r.rating,
      reviewsCount: r.reviewsCount,
      sizes: r.sizes,
      colors: r.colors,
      featured: r.featured,
      createdAt: r.createdAt,
    }));

  const mappedReviews = productReviews.map(r => ({
    id: r.id,
    reviewerName: r.reviewerName,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.createdAt,
  }));

  return (
    <ProductDetailClient 
      product={mappedProduct} 
      initialReviews={mappedReviews}
      relatedProducts={mappedRelated}
    />
  );
}
