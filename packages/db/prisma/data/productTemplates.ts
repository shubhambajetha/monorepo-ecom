// productTemplates.ts
// Step 4: Product templates — curated brand + model name pools.
// We deliberately avoid faker.commerce.productName() (produces nonsense like
// "Handcrafted Granite Chair"). Instead, Step 5/6 will combine:
//   title = `${brand} ${model}`
// using the pools below, picked per collection slug.

export type ProductType = 'clothing' | 'footwear' | 'accessories';

// ---------------------------------------------
// Brands, grouped by product type
// ---------------------------------------------
export const brandsByType: Record<ProductType, string[]> = {
  clothing: [
    'Nike',
    'Adidas',
    'Puma',
    'H&M',
    'Zara',
    "Levi's",
    'Uniqlo',
    'Roadster',
    'US Polo Assn.',
    'Jack & Jones',
  ],
  footwear: [
    'Nike',
    'Adidas',
    'Puma',
    'Jordan',
    'Reebok',
    'New Balance',
    'Skechers',
    'Woodland',
    'Bata',
  ],
  accessories: [
    'Fossil',
    'Wildcraft',
    'American Tourister',
    'Titan',
    'Puma',
    'Nike',
    'Ray-Ban',
    'Da Milano',
    'Woodland',
  ],
};

// ---------------------------------------------
// Model name pools, keyed by exact collection slug from catalog.ts
// ---------------------------------------------
type Template = { type: ProductType; models: string[] };

export const productTemplates: Record<string, Template> = {
  // ---------------- MEN — Clothing ----------------
  'men-tshirts': {
    type: 'clothing',
    models: ['Dri-FIT Tee', 'Graphic Tee', 'Sportswear Tee', 'Essential Crew Tee', 'Slim Fit Tee'],
  },
  'men-shirts': {
    type: 'clothing',
    models: [
      'Oxford Shirt',
      'Linen Shirt',
      'Checked Casual Shirt',
      'Slim Fit Formal Shirt',
      'Flannel Shirt',
    ],
  },
  'men-hoodies': {
    type: 'clothing',
    models: [
      'Club Hoodie',
      'Tech Fleece Hoodie',
      'Essential Hoodie',
      'Pullover Hoodie',
      'Zip-Up Hoodie',
    ],
  },
  'men-sweatshirts': {
    type: 'clothing',
    models: ['Crew Sweatshirt', 'Fleece Sweatshirt', 'Essential Sweatshirt', 'Graphic Sweatshirt'],
  },
  'men-jeans': {
    type: 'clothing',
    models: [
      'Slim Fit Jeans',
      'Straight Fit Jeans',
      'Tapered Jeans',
      'Skinny Jeans',
      'Relaxed Fit Jeans',
    ],
  },
  'men-joggers': {
    type: 'clothing',
    models: ['Tech Fleece Joggers', 'Cuffed Joggers', 'Essential Joggers', 'Slim Fit Joggers'],
  },
  'men-shorts': {
    type: 'clothing',
    models: ['Chino Shorts', 'Sports Shorts', 'Denim Shorts', 'Cargo Shorts'],
  },
  'men-jackets': {
    type: 'clothing',
    models: [
      'Windrunner Jacket',
      'Sports Jacket',
      'Running Jacket',
      'Bomber Jacket',
      'Puffer Jacket',
    ],
  },
  'men-sweaters': {
    type: 'clothing',
    models: ['Crew Neck Sweater', 'V-Neck Sweater', 'Cable Knit Sweater', 'Turtleneck Sweater'],
  },
  'men-track-pants': {
    type: 'clothing',
    models: ['Tricot Track Pants', 'Tapered Track Pants', 'Essential Track Pants'],
  },
  'men-boxers': {
    type: 'clothing',
    models: ['Cotton Stretch Boxer', 'Trunk Boxer Brief', 'Everyday Boxer'],
  },
  'men-pyjamas': {
    type: 'clothing',
    models: ['Cotton Pyjama Set', 'Flannel Pyjama Set', 'Lounge Pyjama Set'],
  },

  // ---------------- MEN — Footwear ----------------
  'men-running-shoes': {
    type: 'footwear',
    models: ['Air Max', 'Pegasus', 'Ultraboost', 'Gel-Kayano', 'Fresh Foam 1080'],
  },
  'men-sneakers': {
    type: 'footwear',
    models: ['Air Force 1', 'Dunk Low', 'RS-X', '574', 'Classic Leather'],
  },
  'men-training-shoes': {
    type: 'footwear',
    models: ['Metcon', 'Nano X', 'Speed Trainer', 'Legend Trainer'],
  },
  'men-slides': {
    type: 'footwear',
    models: ['Comfort Slide', 'Sport Slide', 'Cushion Slide'],
  },
  'men-sandals': {
    type: 'footwear',
    models: ['Trail Sandal', 'Sport Sandal', 'Comfort Sandal'],
  },
  'men-boots': {
    type: 'footwear',
    models: ['Chukka Boot', 'Combat Boot', 'Chelsea Boot', 'Work Boot'],
  },

  // ---------------- MEN — Accessories ----------------
  'men-caps': {
    type: 'accessories',
    models: ['Classic Snapback', 'Curved Brim Cap', 'Trucker Cap'],
  },
  'men-bags': {
    type: 'accessories',
    models: ['Laptop Backpack', 'Duffel Bag', 'Messenger Bag', 'Travel Backpack'],
  },
  'men-belts': { type: 'accessories', models: ['Leather Belt', 'Reversible Belt', 'Canvas Belt'] },
  'men-wallets': {
    type: 'accessories',
    models: ['Bifold Wallet', 'Trifold Wallet', 'Cardholder Wallet'],
  },
  'men-socks': { type: 'accessories', models: ['Ankle Socks', 'Crew Socks', 'No-Show Socks'] },
  'men-gloves': {
    type: 'accessories',
    models: ['Running Gloves', 'Winter Gloves', 'Training Gloves'],
  },

  // ---------------- WOMEN — Clothing ----------------
  'women-tops': {
    type: 'clothing',
    models: ['Sleeveless Top', 'Crop Top', 'Wrap Top', 'Off-Shoulder Top'],
  },
  'women-tshirts': {
    type: 'clothing',
    models: ['Dri-FIT Tee', 'Graphic Tee', 'Fitted Crop Tee', 'Essential Tee'],
  },
  'women-shirts': {
    type: 'clothing',
    models: ['Button-Down Shirt', 'Linen Shirt', 'Checked Shirt', 'Oversized Shirt'],
  },
  'women-dresses': {
    type: 'clothing',
    models: ['Wrap Dress', 'Bodycon Dress', 'Maxi Dress', 'Shirt Dress', 'A-Line Dress'],
  },
  'women-skirts': {
    type: 'clothing',
    models: ['Pleated Skirt', 'A-Line Skirt', 'Denim Skirt', 'Wrap Skirt'],
  },
  'women-jeans': {
    type: 'clothing',
    models: ['Skinny Jeans', 'Straight Fit Jeans', 'Mom Jeans', 'Bootcut Jeans'],
  },
  'women-leggings': {
    type: 'clothing',
    models: ['High-Waist Leggings', 'Seamless Leggings', '7/8 Training Leggings'],
  },
  'women-joggers': {
    type: 'clothing',
    models: ['Tech Fleece Joggers', 'Cuffed Joggers', 'Essential Joggers'],
  },
  'women-hoodies': {
    type: 'clothing',
    models: ['Club Hoodie', 'Cropped Hoodie', 'Essential Hoodie', 'Oversized Hoodie'],
  },
  'women-sweaters': {
    type: 'clothing',
    models: ['Crew Neck Sweater', 'Cable Knit Sweater', 'Turtleneck Sweater'],
  },
  'women-jackets': {
    type: 'clothing',
    models: ['Windrunner Jacket', 'Bomber Jacket', 'Puffer Jacket', 'Denim Jacket'],
  },
  'women-nightwear': {
    type: 'clothing',
    models: ['Satin Nightdress', 'Cotton Pyjama Set', 'Lounge Set'],
  },

  // ---------------- WOMEN — Footwear ----------------
  'women-sneakers': {
    type: 'footwear',
    models: ['Air Force 1', 'Dunk Low', '574', 'Classic Leather'],
  },
  'women-running-shoes': {
    type: 'footwear',
    models: ['Air Max', 'Pegasus', 'Ultraboost', 'Fresh Foam 1080'],
  },
  'women-heels': {
    type: 'footwear',
    models: ['Stiletto Heel', 'Block Heel', 'Kitten Heel', 'Wedge Heel'],
  },
  'women-flats': {
    type: 'footwear',
    models: ['Ballet Flat', 'Loafer Flat', 'Pointed Toe Flat'],
  },
  'women-sandals': {
    type: 'footwear',
    models: ['Strappy Sandal', 'Flat Sandal', 'Comfort Sandal'],
  },
  'women-boots': {
    type: 'footwear',
    models: ['Ankle Boot', 'Chelsea Boot', 'Knee-High Boot', 'Combat Boot'],
  },

  // ---------------- WOMEN — Accessories ----------------
  'women-handbags': {
    type: 'accessories',
    models: ['Tote Bag', 'Sling Bag', 'Satchel Bag', 'Clutch'],
  },
  'women-backpacks': {
    type: 'accessories',
    models: ['Mini Backpack', 'Travel Backpack', 'Laptop Backpack'],
  },
  'women-caps': { type: 'accessories', models: ['Baseball Cap', 'Bucket Hat', 'Trucker Cap'] },
  'women-jewelry': {
    type: 'accessories',
    models: ['Layered Necklace', 'Hoop Earrings', 'Charm Bracelet', 'Studs Set'],
  },
  'women-scarves': { type: 'accessories', models: ['Silk Scarf', 'Winter Scarf', 'Printed Scarf'] },
  'women-sunglasses': {
    type: 'accessories',
    models: ['Cat Eye Sunglasses', 'Round Sunglasses', 'Oversized Sunglasses'],
  },
};

// ---------------------------------------------
// Helper for Step 5/6: pick a random brand + model for a given collection slug
// ---------------------------------------------
export function getRandomProductTemplate(collectionSlug: string) {
  const template = productTemplates[collectionSlug];
  if (!template) {
    throw new Error(`No product template found for collection slug: ${collectionSlug}`);
  }
  const brands = brandsByType[template.type];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = template.models[Math.floor(Math.random() * template.models.length)];
  return { brand, model, title: `${brand} ${model}`, type: template.type };
}
