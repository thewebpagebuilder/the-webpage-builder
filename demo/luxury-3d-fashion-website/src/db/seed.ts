import { db } from "./index";
import { products, reviews, categories, users, attendance, payrollRecords, orders, consultations, notifications, invoices, inventoryLogs } from "./schema";
import { count } from "drizzle-orm";

export async function seedDatabase() {
  try {
    const existingCount = await db.select({ val: count() }).from(products);
    if (existingCount[0].val > 0) {
      console.log("Database already seeded.");
      return;
    }

    console.log("Seeding Peach Petals database with full CRM...");

    // Categories
    await db.insert(categories).values([
      { name: "Kurtis", slug: "kurti", description: "Elegant everyday kurtis & palazzo sets in cotton, viscose & silk", image: "https://peachpetals.in/cdn/shop/files/Azure_Blue_Floral_Print_Kurta_Set_with_Bordered_Dupatta.webp?v=1769596048&width=800" },
      { name: "Gowns", slug: "gown", description: "Flared Anarkali gowns & designer dresses for weddings & festive occasions", image: "https://peachpetals.in/cdn/shop/files/Tiered_Pastel_Anarkali_Gown_with_Embroidered_Bodice.webp?v=1771399184&width=800" },
      { name: "Lehengas", slug: "lehenga", description: "Bridal & festive lehengas with zardosi, mirror work & Banarasi brocade", image: "https://peachpetals.in/cdn/shop/files/857-2489_2.webp?v=1770894040&width=800" },
    ]);

    // CRM users
    const crmUsers = await db.insert(users).values([
      { name: "Peach Admin", email: "admin@peachpetals.in", password: "admin123", role: "admin", phone: "+91 98765 11111", department: "Management", salaryMonthly: 95000, hireDate: "2024-01-15", active: true },
      { name: "Priya Sharma", email: "priya@peachpetals.in", password: "peach123", role: "employee", phone: "+91 98765 22222", department: "Sales", salaryMonthly: 42000, hireDate: "2024-03-01", active: true },
      { name: "Anjali Mehta", email: "anjali@peachpetals.in", password: "peach123", role: "employee", phone: "+91 98765 33333", department: "Tailoring", salaryMonthly: 38000, hireDate: "2024-04-10", active: true },
      { name: "Riya Kapoor", email: "riya@peachpetals.in", password: "peach123", role: "employee", phone: "+91 98765 44444", department: "Customer Care", salaryMonthly: 36000, hireDate: "2024-05-20", active: true },
      { name: "Sanya Joshi", email: "sanya@peachpetals.in", password: "peach123", role: "employee", phone: "+91 98765 55555", department: "Inventory", salaryMonthly: 34000, hireDate: "2024-06-05", active: true },
    ]).returning();

    // Products - 36 total (12 kurtis, 12 gowns, 12 lehengas)
    const items = [
      // KURTIS (12)
      {
        name: "Teal Blossom Embroidered Kurti Palazzo Set",
        description: "A soothing teal kurti palazzo set designed with delicate floral embroidery and traditional detailing. Made from high-quality viscose silk for a luxurious sheen and comfortable look. This breathable, lightweight fabric is ideal for long summer celebrations or destination events. The V-neckline adds a touch of sophistication, beautifully elongating the neck.",
        category: "kurti", price: 5650, originalPrice: 7990,
        image: "https://peachpetals.in/cdn/shop/files/Azure_Blue_Floral_Print_Kurta_Set_with_Bordered_Dupatta.webp?v=1769596048&width=800",
        fabric: "Viscose Silk", work: "Delicate Floral Embroidery & Zari Borders", occasion: "Festive, Casual",
        rating: 5, reviewsCount: 18, sizes: ["XS","S","M","L","XL","XXL","3XL"], colors: ["Teal Blue","Ocean Blue"], featured: true,
        sku: "PP-KT-001", stockQuantity: 32, costPrice: 3100,
      },
      {
        name: "Geometric Tribal Kurta with Patterned Dupatta",
        description: "This elegant ensemble features a graceful A-line silhouette detailed with distinctive tribal-inspired prints and geometric designs. The kurti offers a loose, flowy, and modern fit paired with matching straight pants and a soft printed dupatta.",
        category: "kurti", price: 4499, originalPrice: 6749,
        image: "https://peachpetals.in/cdn/shop/files/Geometric_Tribal_Print_Kurta_Set_with_Matching_Patterned_Dupatta.webp?v=1773137840&width=800",
        fabric: "Premium Cotton", work: "Geometric & Tribal Block Print", occasion: "Casual, Semi-Formal",
        rating: 4, reviewsCount: 12, sizes: ["S","M","L","XL","XXL"], colors: ["Midnight Blue","Tribal Cream"], featured: true,
        sku: "PP-KT-002", stockQuantity: 18, costPrice: 2400,
      },
      {
        name: "Mandala Embroidered Kurta Set with Floral Dupatta",
        description: "Add timeless elegance to your wardrobe with this beautifully crafted Mandala Print ensemble. Features intricate mandala embroidery motifs across the kurta paired with a contrasting floral-printed dupatta.",
        category: "kurti", price: 2750, originalPrice: 5490,
        image: "https://peachpetals.in/cdn/shop/files/Embroidered_Mandala_Motif_Kurta.webp?v=1773132590&width=800",
        fabric: "Cotton Blend", work: "Mandala Thread Embroidery & Block Print", occasion: "Casual, Day Events",
        rating: 5, reviewsCount: 27, sizes: ["XS","S","M","L","XL","XXL"], colors: ["Ivory Cream","Soft Beige"], featured: true,
        sku: "PP-KT-003", stockQuantity: 41, costPrice: 1450,
      },
      {
        name: "Traditional Long Kurta Set with Intricate Florals",
        description: "This elegant ensemble features a graceful, flowing kurta adorned with traditional prints and detailed floral motifs. The A-line silhouette creates a beautiful flow that complements all body types.",
        category: "kurti", price: 2090, originalPrice: 7499,
        image: "https://peachpetals.in/cdn/shop/files/Traditional_Long_Kurta_Set_with_Intricate_Floral_and_Geometric_Patterns.webp?v=1769599399&width=800",
        fabric: "Cotton Silk", work: "Traditional Floral & Geometric Block Prints", occasion: "Casual, Semi-Formal",
        rating: 4, reviewsCount: 13, sizes: ["XS","S","M","L","XL","XXL","3XL"], colors: ["Navy Blue","Indigo"], featured: false,
        sku: "PP-KT-004", stockQuantity: 28, costPrice: 1100,
      },
      {
        name: "Straight Pant & Kurti Combo for Every Occasion",
        description: "V-neck kurti paired with straight pants, designed to make you feel effortlessly chic. The kurti features a delicate floral print that exudes freshness and femininity, perfect for both casual outings and semi-formal gatherings.",
        category: "kurti", price: 1990, originalPrice: 6749,
        image: "https://peachpetals.in/cdn/shop/files/747-539_1.webp?v=1773117931&width=800",
        fabric: "Premium Cotton", work: "Delicate Floral Print", occasion: "Casual, Semi-Formal",
        rating: 5, reviewsCount: 22, sizes: ["XS","S","M","L","XL","XXL","3XL"], colors: ["Sky Blue","Cream"], featured: true,
        sku: "PP-KT-005", stockQuantity: 55, costPrice: 980,
      },
      {
        name: "Full Sleeves Anarkali Kurta with Palazzo",
        description: "Step into effortless elegance with this full-sleeves Anarkali kurta with palazzo, beautifully crafted in soft cotton. Featuring a mesmerizing mahendi and maroon floral print, this ensemble exudes grace and charm.",
        category: "kurti", price: 3999, originalPrice: 7999,
        image: "https://peachpetals.in/cdn/shop/files/805-1426_8.webp?v=1769667742&width=800",
        fabric: "Cotton", work: "Floral Print", occasion: "Festive, Wedding",
        rating: 5, reviewsCount: 19, sizes: ["S","M","L","XL","XXL"], colors: ["Mahendi Maroon","Green"], featured: false,
        sku: "PP-KT-006", stockQuantity: 14, costPrice: 2050,
      },
      {
        name: "Indigo Floral Printed Salwar Suit",
        description: "This traditional kurta set features intricate floral patterns on a premium cotton base. The straight-cut design paired with comfortable salwar creates an effortless, elegant look suitable for daily wear.",
        category: "kurti", price: 2299, originalPrice: 5999,
        image: "https://peachpetals.in/cdn/shop/files/NRJ_6586.webp?v=1769593338&width=800",
        fabric: "Cotton", work: "Floral Block Print", occasion: "Casual, Daily Wear",
        rating: 4, reviewsCount: 8, sizes: ["S","M","L","XL","XXL"], colors: ["Indigo","Navy"], featured: false,
        sku: "PP-KT-007", stockQuantity: 22, costPrice: 1200,
      },
      {
        name: "Printed Kurti & Straight Pant for Effortless Style",
        description: "A casual yet elegant kurti-pant set with vibrant printed patterns. Perfect for everyday wear, office outings, and casual social gatherings with all-day comfort and breathability.",
        category: "kurti", price: 1990, originalPrice: 6749,
        image: "https://peachpetals.in/cdn/shop/files/WhatsApp_Image_2025-02-25_at_17.52.16_55533838.webp?v=1769593229&width=800",
        fabric: "Cotton", work: "Printed Design", occasion: "Casual, Office",
        rating: 4, reviewsCount: 10, sizes: ["XS","S","M","L","XL","XXL"], colors: ["Multicolor"], featured: false,
        sku: "PP-KT-008", stockQuantity: 37, costPrice: 1020,
      },
      {
        name: "Embroidered Cotton Salwar Suit with Dupatta",
        description: "An elegant three-piece salwar suit featuring delicate embroidery work on the kurti. The matching dupatta with traditional borders completes this sophisticated ensemble, perfect for festive occasions.",
        category: "kurti", price: 3499, originalPrice: 6999,
        image: "https://peachpetals.in/cdn/shop/files/978-12455.webp?v=1769661207&width=800",
        fabric: "Cotton", work: "Embroidery", occasion: "Festive, Semi-Formal",
        rating: 5, reviewsCount: 15, sizes: ["S","M","L","XL","XXL"], colors: ["Cream","Beige"], featured: false,
        sku: "PP-KT-009", stockQuantity: 9, costPrice: 1850,
      },
      {
        name: "Elegant Floral Print Anarkali Set with Dupatta",
        description: "This graceful silhouette features a deep-toned base adorned with sophisticated geometric and floral motifs throughout. The oversized matching dupatta showcases elaborate traditional borders.",
        category: "kurti", price: 4290, originalPrice: 8290,
        image: "https://peachpetals.in/cdn/shop/files/1276-JHARNA_1.webp?v=1770891962&width=800",
        fabric: "Cotton Blend", work: "Mirror Work & Floral Print", occasion: "Festive, Wedding",
        rating: 5, reviewsCount: 16, sizes: ["S","M","L","XL","XXL"], colors: ["Beige","Ivory"], featured: true,
        sku: "PP-KT-010", stockQuantity: 21, costPrice: 2300,
      },
      {
        name: "Flared Printed V-Neck Kurti with Palazzo",
        description: "Flared printed V-neck kurti paired with a matching printed dupatta and plain palazzo pants. The contemporary fusion design brings together traditional Indian elements with modern Western silhouettes.",
        category: "kurti", price: 2990, originalPrice: 5990,
        image: "https://peachpetals.in/cdn/shop/files/805-1467_4.webp?v=1770955347&width=800",
        fabric: "Rayon", work: "Floral Print", occasion: "Casual, Office",
        rating: 4, reviewsCount: 11, sizes: ["S","M","L","XL","XXL"], colors: ["Coral","Peach"], featured: false,
        sku: "PP-KT-011", stockQuantity: 26, costPrice: 1550,
      },
      {
        name: "Indo-Western Palazzo Set – Fusion Elegance",
        description: "A kurti with straight pants and dupatta with latkans on the front neck is a chic contemporary take on traditional wear. Features a fusion of traditional Indian elements and modern Western styles with intricate embroidery.",
        category: "kurti", price: 4690, originalPrice: 8990,
        image: "https://peachpetals.in/cdn/shop/files/60-9383_2.webp?v=1770961743&width=800",
        fabric: "Viscose Silk", work: "Embroidery & Lace", occasion: "Festive, Party",
        rating: 5, reviewsCount: 14, sizes: ["S","M","L","XL","XXL"], colors: ["Lavender","Pista"], featured: false,
        sku: "PP-KT-012", stockQuantity: 17, costPrice: 2550,
      },

      // GOWNS (12)
      {
        name: "Sage Green Embroidered Anarkali Kurta & Palazzo Set",
        description: "Step into timeless grace with this beautifully crafted Sage Green Anarkali, designed for wedding and festive celebrations. Includes a flared royal silhouette with intricate embroidery work on the yoke and a sheer premium dupatta.",
        category: "gown", price: 6490, originalPrice: 8990,
        image: "https://peachpetals.in/cdn/shop/files/60-37076_5.webp?v=1770900421&width=800",
        fabric: "Cotton Silk", work: "Intricate Hand Embroidered Yoke & Floral Motifs", occasion: "Wedding, Festive",
        rating: 5, reviewsCount: 22, sizes: ["XS","S","M","L","XL","XXL","3XL"], colors: ["Sage Green","Mint Pastel"], featured: true,
        sku: "PP-GW-001", stockQuantity: 15, costPrice: 3600,
      },
      {
        name: "V-Neck Anarkali Kurta with Palazzo (Onion Pink)",
        description: "Elevate your ethnic wardrobe with our V-Neck Anarkali Kurti with Palazzo, crafted from luxurious cotton silk. The elegant V-neck design beautifully enhances your neckline with a subtle sheen.",
        category: "gown", price: 3799, originalPrice: 7599,
        image: "https://peachpetals.in/cdn/shop/files/60-37076_2.webp?v=1770900421&width=800",
        fabric: "Cotton Silk", work: "Lace borders & Gota Patti detailing", occasion: "Festive, Family Sangeet",
        rating: 4, reviewsCount: 19, sizes: ["XS","S","M","L","XL","XXL","3XL"], colors: ["Onion Pink","Blush Peach"], featured: true,
        sku: "PP-GW-002", stockQuantity: 24, costPrice: 1990,
      },
      {
        name: "Plum and Copper Gradient Anarkali Gown",
        description: "Deep Wine & Copper Silk Anarkali Gown where grace meets grandeur. Unique gradient layout merges the deep-toned base with sophisticated copper geometric accents and highly comfortable flared volume.",
        category: "gown", price: 8990, originalPrice: 12990,
        image: "https://peachpetals.in/cdn/shop/files/Multicolored_Tiered_Embroidered_Anarkali_Gown.webp?v=1771399011&width=800",
        fabric: "Viscose Silk Blend", work: "Gradient Hand-Dyed with Sequin-Embroidered Bodice", occasion: "Wedding, Festive Reception",
        rating: 5, reviewsCount: 11, sizes: ["S","M","L","XL","XXL"], colors: ["Deep Plum","Copper Rose"], featured: true,
        sku: "PP-GW-003", stockQuantity: 8, costPrice: 5100,
      },
      {
        name: "Ivory Bloom Floral Anarkali Set",
        description: "Soft, romantic, and effortlessly elegant — Ivory Bloom Floral Anarkali offers a dreamy pastel aesthetic in pure georgette, complete with lightweight flowy dupatta and detailed hand-embroidery.",
        category: "gown", price: 11990, originalPrice: 15990,
        image: "https://peachpetals.in/cdn/shop/files/Tiered_Pastel_Anarkali_Gown_with_Embroidered_Bodice.webp?v=1771399184&width=800",
        fabric: "Premium Georgette", work: "Pastel Floral Printed with Chikankari & Gota borders", occasion: "Wedding, Brunch",
        rating: 5, reviewsCount: 16, sizes: ["XS","S","M","L","XL"], colors: ["Ivory White","Pastel Rose"], featured: true,
        sku: "PP-GW-004", stockQuantity: 11, costPrice: 6700,
      },
      {
        name: "Emerald Green Royal Anarkali Gown",
        description: "Emerald Green Anarkali with rich embroidery and a royal flowy silhouette. Designed to make you feel like royalty with unmatched breathability and grand volume that moves beautifully with you.",
        category: "gown", price: 6490, originalPrice: 9290,
        image: "https://peachpetals.in/cdn/shop/files/Dark_Green_Floor-Length_Floral_Anarkali_with_Sequin_Embroidery.webp?v=1770270560&width=800",
        fabric: "Chinon Silk", work: "Heavy Sequin Embroidery & Elegant Threadwork", occasion: "Wedding, Sangeet Night",
        rating: 5, reviewsCount: 20, sizes: ["S","M","L","XL","XXL"], colors: ["Emerald Green","Royal Forest Green"], featured: false,
        sku: "PP-GW-005", stockQuantity: 19, costPrice: 3600,
      },
      {
        name: "Pastel Floral Indo-Western Gown with Sheer Dupatta",
        description: "Make every celebration magical with this dreamy pastel-tiered ombre ethnic gown. Features a beautifully embroidered bodice with delicate scalloped sheer dupatta. Floor-length flow creates a breathtaking entrance.",
        category: "gown", price: 7750, originalPrice: 11990,
        image: "https://peachpetals.in/cdn/shop/files/Pastel_Floral_Indo-Western_Gown_with_V-Neck_and_Sheer_Dupatta.webp?v=1772079862&width=800",
        fabric: "Georgette & Net", work: "Ombre Dye, Sequin & Scalloped Embroidery", occasion: "Wedding, Reception",
        rating: 5, reviewsCount: 9, sizes: ["S","M","L","XL"], colors: ["Pastel Pink","Lavender Haze"], featured: true,
        sku: "PP-GW-006", stockQuantity: 13, costPrice: 4300,
      },
      {
        name: "Blue Georgette Anarkali Gown with Embroidery",
        description: "Step into elegance with this stunning blue Anarkali gown. The georgette fabric drapes beautifully while the intricate embroidery work adds a regal touch. Perfect for wedding ceremonies and festive celebrations.",
        category: "gown", price: 5999, originalPrice: 15899,
        image: "https://peachpetals.in/cdn/shop/files/337.webp?v=1770111644&width=800",
        fabric: "Premium Georgette", work: "Intricate Thread & Sequin Embroidery", occasion: "Wedding, Festive",
        rating: 5, reviewsCount: 24, sizes: ["XS","S","M","L","XL","XXL"], colors: ["Royal Blue","Sky Blue"], featured: true,
        sku: "PP-GW-007", stockQuantity: 29, costPrice: 3200,
      },
      {
        name: "Radiant Black Modal Silk Anarkali Gown",
        description: "Turn heads at weddings and festive celebrations with our exquisite black Anarkali gown. The modal silk fabric offers a luxurious drape and subtle sheen. Intricate embroidery work adorns the bodice and hemline.",
        category: "gown", price: 8599, originalPrice: 12999,
        image: "https://peachpetals.in/cdn/shop/files/369.webp?v=1770285389&width=800",
        fabric: "Modal Silk", work: "Heavy Zari & Thread Embroidery", occasion: "Wedding, Reception",
        rating: 5, reviewsCount: 15, sizes: ["S","M","L","XL","XXL","3XL"], colors: ["Midnight Black","Jet Black"], featured: false,
        sku: "PP-GW-008", stockQuantity: 7, costPrice: 4800,
      },
      {
        name: "Flawless Sky Blue Indo-Western Anarkali Dress",
        description: "Graceful Sky Blue Indo-Western Anarkali Gown designed for special occasions. The Chinon fabric feels luxurious against the skin, while pearl work embroidery adds a delicate, feminine touch.",
        category: "gown", price: 9699, originalPrice: 14999,
        image: "https://peachpetals.in/cdn/shop/files/805-1480_6.webp?v=1771590271&width=800",
        fabric: "Chinon Silk", work: "Pearl Work & Delicate Thread Embroidery", occasion: "Wedding, Festive",
        rating: 5, reviewsCount: 21, sizes: ["S","M","L","XL","XXL"], colors: ["Sky Blue","Powder Blue"], featured: true,
        sku: "PP-GW-009", stockQuantity: 12, costPrice: 5400,
      },
      {
        name: "Grey Anarkali Designer Indo-Western Gown",
        description: "Elevate your style with this luxurious Grey Anarkali Designer Gown crafted from premium Georgette fabric adorned with intricate sequence work. Blends traditional elegance with contemporary charm.",
        category: "gown", price: 7990, originalPrice: 20299,
        image: "https://peachpetals.in/cdn/shop/files/346.webp?v=1770115083&width=800",
        fabric: "Georgette", work: "Sequence Work & Embroidery", occasion: "Wedding, Party",
        rating: 5, reviewsCount: 18, sizes: ["S","M","L","XL","XXL"], colors: ["Grey","Silver"], featured: false,
        sku: "PP-GW-010", stockQuantity: 16, costPrice: 4400,
      },
      {
        name: "Mustard Yellow Anarkali Flared Kurta Set",
        description: "Premium Viscose Silk Anarkali Flared Kurta Set crafted with meticulous attention to detail. The rich mustard yellow hue combined with intricate embroidery creates a stunning festive look.",
        category: "gown", price: 5650, originalPrice: 6999,
        image: "https://peachpetals.in/cdn/shop/files/24_eec48524-8d3c-420a-9fab-f6a53cef0c68.webp?v=1769594233&width=800",
        fabric: "Viscose Silk", work: "Embroidery & Gota Work", occasion: "Festive, Haldi",
        rating: 4, reviewsCount: 9, sizes: ["S","M","L","XL","XXL"], colors: ["Mustard Yellow","Golden"], featured: false,
        sku: "PP-GW-011", stockQuantity: 20, costPrice: 3100,
      },
      {
        name: "Rust Colour Anarkali Flared Kurta with Palazzo",
        description: "Elevate your ethnic wardrobe with this Rust Colour Anarkali Flared Kurta Set crafted in premium viscose silk. The flared silhouette provides a graceful fall, complementing all body types with a regal appearance.",
        category: "gown", price: 6999, originalPrice: 9999,
        image: "https://peachpetals.in/cdn/shop/files/25_d98d40a1-ecd6-41b5-8c11-309eabb28cb0.webp?v=1769594233&width=800",
        fabric: "Viscose Silk", work: "Thread Embroidery", occasion: "Wedding, Festive",
        rating: 5, reviewsCount: 13, sizes: ["S","M","L","XL","XXL"], colors: ["Rust Orange","Terracotta"], featured: false,
        sku: "PP-GW-012", stockQuantity: 15, costPrice: 3900,
      },

      // LEHENGAS (12)
      {
        name: "Lavender & Pista Indo-Western Lehenga Choli",
        description: "Exude elegance and grace with this premium designer Lehenga Choli. The high-waisted skirt flows gracefully, featuring exquisite thread, mirror, and zardosi work for a modern silhouette that moves away from standard borders.",
        category: "lehenga", price: 14090, originalPrice: 19990,
        image: "https://peachpetals.in/cdn/shop/files/857-2489_2.webp?v=1770894040&width=800",
        fabric: "Brocade & Organza Silk", work: "Zardosi, Hand-Cut Mirrors & Premium Thread Embroidery", occasion: "Wedding, Royal Reception",
        rating: 5, reviewsCount: 15, sizes: ["S","M","L","XL"], colors: ["Lavender-Pista Gradient","Lilac Pastel"], featured: true,
        sku: "PP-LH-001", stockQuantity: 9, costPrice: 7900,
      },
      {
        name: "Beige Bridal Lehenga Choli with Sequins & Lace",
        description: "Timeless elegance meets festive glamour with this stunning beige bridal lehenga choli. Adorned with intricate sequins work and delicate lace detailing. Features a handcrafted Bhandhani dupatta.",
        category: "lehenga", price: 7990, originalPrice: 14299,
        image: "https://peachpetals.in/cdn/shop/files/805-1467_6.webp?v=1770955347&width=800",
        fabric: "Simmer & Organza", work: "Sequins, Lace Work & Bhandhani Dupatta", occasion: "Wedding, Festive Glam",
        rating: 5, reviewsCount: 12, sizes: ["S","M","L","XL","XXL"], colors: ["Beige Gold","Champagne"], featured: true,
        sku: "PP-LH-002", stockQuantity: 14, costPrice: 4400,
      },
      {
        name: "Dark Green Floral Print Lehenga with Sequin Bodice",
        description: "This stunning dark green lehenga features beautiful floral prints with an elaborately embroidered and sequin-adorned bodice. The A-line silhouette flatters all body types.",
        category: "lehenga", price: 10999, originalPrice: 16499,
        image: "https://peachpetals.in/cdn/shop/files/Dark_Green_Floral_Print_Anarkali_with_Sequin_Embroidered_Bodice.webp?v=1770270659&width=800",
        fabric: "Silk & Organza", work: "Sequin Embroidery & Floral Print", occasion: "Wedding, Sangeet",
        rating: 5, reviewsCount: 14, sizes: ["S","M","L","XL"], colors: ["Dark Green","Forest Green"], featured: true,
        sku: "PP-LH-003", stockQuantity: 6, costPrice: 6200,
      },
      {
        name: "Embellished Peplum Top with Flared Skirt in Sage",
        description: "This stunning outfit showcases a perfect blend of traditional craftsmanship and contemporary style. The peplum top is designed with exquisite thread work and mirror accents. Paired with a high-waisted flared skirt.",
        category: "lehenga", price: 16450, originalPrice: 24989,
        image: "https://peachpetals.in/cdn/shop/files/417-SKD162_1.webp?v=1771657806&width=800",
        fabric: "Organza & Satin Silk", work: "Zardosi, Mirror Work & Thread Embroidery", occasion: "Wedding, Reception",
        rating: 5, reviewsCount: 8, sizes: ["S","M","L","XL"], colors: ["Sage Green","Olive"], featured: true,
        sku: "PP-LH-004", stockQuantity: 5, costPrice: 9300,
      },
      {
        name: "Red Banarasi Peplum Top & Palazzo Set",
        description: "Celebrate timeless heritage with this stunning Red Banarasi silk gharara set. Features rich gold brocade patterns and high-waisted flowy bottoms that reflect majestic Indian craftsmanship.",
        category: "lehenga", price: 7750, originalPrice: 11990,
        image: "https://peachpetals.in/cdn/shop/files/22_381ce856-6ee4-4672-a213-6409261dff13_1.webp?v=1769590337&width=800",
        fabric: "Banarasi Silk", work: "Golden Zari Weaving & Handcrafted Borders", occasion: "Festive, Wedding, Puja",
        rating: 5, reviewsCount: 31, sizes: ["S","M","L","XL","XXL"], colors: ["Crimson Red","Royal Gold"], featured: true,
        sku: "PP-LH-005", stockQuantity: 18, costPrice: 4200,
      },
      {
        name: "Rani Wedding/Festive Salwar Suit & Kaftan Set",
        description: "Drape yourself in the majestic allure of this rani-colored salwar suit with an Indo-Western kaftan flare. Perfectly balanced for long summer celebrations or sangeet night events.",
        category: "lehenga", price: 3995, originalPrice: 5995,
        image: "https://peachpetals.in/cdn/shop/files/1276-JHARNA_5.webp?v=1770891926&width=800",
        fabric: "Chinon & Viscose Silk", work: "Hand Embroidered Neckline & Premium Silk Latkans", occasion: "Festive, Wedding sangeet",
        rating: 5, reviewsCount: 14, sizes: ["S","M","L","XL","XXL"], colors: ["Rani Pink","Wine Red"], featured: true,
        sku: "PP-LH-006", stockQuantity: 27, costPrice: 2100,
      },
      {
        name: "Brown Designer Sharara Set",
        description: "Perfect for wedding and festive celebrations, this stunning Brown Designer Sharara Set features a peplum-style top paired with wide-leg sharara pants. Intricate embroidery and mirror work add luxury.",
        category: "lehenga", price: 9899, originalPrice: 12399,
        image: "https://peachpetals.in/cdn/shop/files/805-1448_18_74288639-b1d6-4e38-884e-97c11fcd0224_1.webp?v=1769683606&width=800",
        fabric: "Chinon Silk", work: "Thread Embroidery & Mirror Work Detailing", occasion: "Wedding, Festive",
        rating: 5, reviewsCount: 17, sizes: ["S","M","L","XL","XXL"], colors: ["Rich Brown","Copper"], featured: false,
        sku: "PP-LH-007", stockQuantity: 11, costPrice: 5500,
      },
      {
        name: "Purple Georgette Designer Salwar Suit",
        description: "Elevate your ethnic wardrobe with this luxurious Purple Georgette Designer Salwar Suit. Crafted from premium georgette fabric adorned with intricate embroidery work.",
        category: "lehenga", price: 2199, originalPrice: 4999,
        image: "https://peachpetals.in/cdn/shop/files/416-5184_4.webp?v=1770899084&width=800",
        fabric: "Georgette", work: "Embroidery & Stone Work Detailing", occasion: "Festive, Parties",
        rating: 4, reviewsCount: 11, sizes: ["S","M","L","XL","XXL"], colors: ["Deep Purple","Plum"], featured: false,
        sku: "PP-LH-008", stockQuantity: 33, costPrice: 1150,
      },
      {
        name: "Elegant Floral Print Anarkali Set with Dupatta",
        description: "This graceful silhouette features a deep-toned base adorned with sophisticated geometric and floral motifs throughout. Oversized matching dupatta showcases elaborate traditional borders.",
        category: "lehenga", price: 4499, originalPrice: 9999,
        image: "https://peachpetals.in/cdn/shop/files/21_0568d52d-d397-4e03-b46c-c6391a783f3e.webp?v=1769590337&width=800",
        fabric: "Cotton Silk", work: "Floral & Geometric Motifs", occasion: "Festive, Celebrations",
        rating: 5, reviewsCount: 18, sizes: ["XS","S","M","L","XL","XXL"], colors: ["Cream","Beige"], featured: false,
        sku: "PP-LH-009", stockQuantity: 19, costPrice: 2400,
      },
      {
        name: "Vibrant Multi-Color Bridal Festive Lehenga",
        description: "Step into a world of vibrant charm with our Multi-Color Elegance collection, crafted for weddings and glamorous parties. Made from shimmering fabric offering a luxurious and flowy look with intricate sequin work.",
        category: "lehenga", price: 18990, originalPrice: 24989,
        image: "https://peachpetals.in/cdn/shop/files/417-KP171_5.webp?v=1771656868&width=800",
        fabric: "Simmer Silk", work: "Sequin Work & Elegant Patti Detailing", occasion: "Wedding, Reception",
        rating: 5, reviewsCount: 9, sizes: ["S","M","L","XL"], colors: ["Multi Color", "Rainbow"], featured: true,
        sku: "PP-LH-010", stockQuantity: 4, costPrice: 10800,
      },
      {
        name: "Cream Bridal Lehenga Choli – Sequins & Lace",
        description: "Elevate your wedding or festive ensemble with this stunning cream lehenga choli. Timeless elegance with handcrafted detailing, sequins, and lace work for a glamorous festive look.",
        category: "lehenga", price: 12999, originalPrice: 18999,
        image: "https://peachpetals.in/cdn/shop/files/805-1447_15_8b14c432-799c-4991-b3e6-5a0a3e326a5e.webp?v=1769683320&width=800",
        fabric: "Net & Silk", work: "Sequins & Lace Work", occasion: "Wedding, Bridal",
        rating: 5, reviewsCount: 22, sizes: ["S","M","L","XL"], colors: ["Cream","Ivory Gold"], featured: true,
        sku: "PP-LH-011", stockQuantity: 8, costPrice: 7200,
      },
      {
        name: "Black & Purple Designer Lehenga Choli",
        description: "Elevate your ethnic wardrobe with the elegant Black & Purple Designer Lehenga. A stunning statement piece combining rich black velvet with purple organza accents and heavy zari embroidery.",
        category: "lehenga", price: 15450, originalPrice: 21990,
        image: "https://peachpetals.in/cdn/shop/files/417-KD117_2.webp?v=1771399741&width=800",
        fabric: "Velvet & Organza", work: "Zari Embroidery & Stone Work", occasion: "Wedding, Reception, Sangeet",
        rating: 5, reviewsCount: 7, sizes: ["S","M","L","XL"], colors: ["Black Purple","Royal Plum"], featured: false,
        sku: "PP-LH-012", stockQuantity: 6, costPrice: 8800,
      },
    ];

    for (const item of items) {
      const inserted = await db.insert(products).values(item).returning({ id: products.id });
      await db.insert(reviews).values([
        { productId: inserted[0].id, productName: item.name, reviewerName: "Aishwarya R.", rating: 5, comment: `The ${item.fabric} quality is absolutely premium! Perfect fit with custom tailoring. Received so many compliments!`, verified: true },
        { productId: inserted[0].id, productName: item.name, reviewerName: "Priyanka S.", rating: item.rating || 5, comment: `Beautiful ${item.work}. Highly recommend Peach Petals! The video consultation was incredibly helpful.`, verified: true },
        { productId: inserted[0].id, productName: item.name, reviewerName: "Neha M.", rating: 5, comment: `Absolutely stunning! Packaging was elegant and delivery was faster than expected. Will definitely order again!`, verified: true }
      ]);
    }

    // Sample consultations
    await db.insert(consultations).values([
      { customerName: "Kavya Reddy", customerEmail: "kavya@example.com", phone: "+91 98765 00011", date: "2026-07-02", timeSlot: "11:00 AM - 12:00 PM", productTitle: "Ivory Bloom Floral Anarkali Set", status: "confirmed" },
      { customerName: "Meera Singh", customerEmail: "meera@example.com", phone: "+91 98765 00022", date: "2026-07-03", timeSlot: "4:00 PM - 5:00 PM", productTitle: "Lavender & Pista Lehenga Choli", status: "pending" },
    ]);

    // Sample orders
    await db.insert(orders).values([
      { invoiceNumber: "PP-20240601", customerName: "Sneha Patel", customerEmail: "sneha@example.com", phone: "+91 91234 56789", productTitle: "Teal Blossom Embroidered Kurti Palazzo Set", size: "M", quantity: 1, unitPrice: 5650, totalAmount: 5650, orderStatus: "shipped", paymentStatus: "paid" },
      { invoiceNumber: "PP-20240602", customerName: "Ananya Gupta", customerEmail: "ananya@example.com", phone: "+91 99887 65432", productTitle: "Lavender & Pista Indo-Western Lehenga Choli", size: "L", quantity: 1, unitPrice: 14090, totalAmount: 14090, orderStatus: "tailoring", paymentStatus: "paid" },
    ]);

    // Attendance for current month
    const today = new Date().toISOString().slice(0,10);
    for (let i = 1; i <= 5; i++) {
      await db.insert(attendance).values({
        userId: i,
        date: today,
        checkIn: new Date(),
        status: "present",
      }).onConflictDoNothing();
    }

    // Notifications
    await db.insert(notifications).values([
      { type: "order_created", title: "New Order #PP-20240602", message: "Ananya Gupta ordered Lavender & Pista Lehenga Choli - ₹14,090", relatedId: 2, relatedType: "order", whatsappSent: true },
      { type: "consultation_booked", title: "Video Consultation Booked", message: "Kavya Reddy booked a video call for July 2nd, 11 AM", relatedId: 1, relatedType: "consultation", whatsappSent: true },
      { type: "low_stock", title: "Low Stock Alert", message: "Embellished Peplum Top with Flared Skirt - Only 5 pieces left", relatedId: 24, relatedType: "product", whatsappSent: false },
    ]);

    console.log("✓ Seeded: 36 products, 108 reviews, 5 CRM users, orders, consultations, attendance, notifications");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
