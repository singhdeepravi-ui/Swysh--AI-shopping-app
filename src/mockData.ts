import { Brand, Product } from './types';

export const BRANDS: Brand[] = [
  {
    id: 'b1',
    name: 'EcoThread',
    isSustainable: true,
    isEmerging: true,
    description: 'Circular fashion made from 100% recycled textiles.',
    logo: 'https://picsum.photos/seed/ecothread/100/100'
  },
  {
    id: 'b2',
    name: 'UrbanVibe',
    isSustainable: false,
    isEmerging: true,
    description: 'Streetwear for the digital nomad.',
    logo: 'https://picsum.photos/seed/urbanvibe/100/100'
  },
  {
    id: 'b3',
    name: 'LuxeEarth',
    isSustainable: true,
    isEmerging: false,
    description: 'Premium organic silk and linen essentials.',
    logo: 'https://picsum.photos/seed/luxeearth/100/100'
  },
  {
    id: 'b4',
    name: 'NeonPulse',
    isSustainable: false,
    isEmerging: true,
    description: 'Cyberpunk inspired futuristic fashion.',
    logo: 'https://picsum.photos/seed/neonpulse/100/100'
  },
  {
    id: 'b5',
    name: 'HeritageKnit',
    isSustainable: true,
    isEmerging: true,
    description: 'Hand-knitted pieces by local artisans.',
    logo: 'https://picsum.photos/seed/heritage/100/100'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Recycled Cotton Oversized Tee',
    price: 45,
    brandId: 'b1',
    category: 'Tops',
    gender: 'Unisex',
    aesthetic: 'Minimalist',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'],
    description: 'A comfortable, breathable tee made entirely from textile waste.',
    sustainabilityFeatures: ['Recycled Material', 'Water-saving Dye'],
    isEmerging: true
  },
  {
    id: 'p2',
    name: 'Cargo Tech Pants',
    price: 120,
    brandId: 'b2',
    category: 'Bottoms',
    gender: 'Men',
    aesthetic: 'Streetwear',
    images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80'],
    description: 'Multi-pocket techwear pants for urban exploration.',
    isEmerging: true
  },
  {
    id: 'p3',
    name: 'Organic Silk Slip Dress',
    price: 210,
    brandId: 'b3',
    category: 'Dresses',
    gender: 'Women',
    aesthetic: 'Luxury',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'],
    description: 'Elegant slip dress made from GOTS certified organic silk.',
    sustainabilityFeatures: ['GOTS Organic', 'Fair Trade'],
    isEmerging: false
  },
  {
    id: 'p4',
    name: 'Reflective Bomber Jacket',
    price: 180,
    brandId: 'b4',
    category: 'Outerwear',
    gender: 'Unisex',
    aesthetic: 'Y2K',
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'],
    description: 'High-visibility reflective jacket for night-time style.',
    isEmerging: true
  },
  {
    id: 'p5',
    name: 'Hand-loomed Wool Sweater',
    price: 150,
    brandId: 'b5',
    category: 'Tops',
    gender: 'Women',
    aesthetic: 'Vintage',
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80'],
    description: 'Warm, chunky knit sweater crafted by traditional weavers.',
    sustainabilityFeatures: ['Artisanal', 'Natural Fibers'],
    isEmerging: true
  },
  {
    id: 'p6',
    name: 'Linen Wide-Leg Trousers',
    price: 85,
    brandId: 'b3',
    category: 'Bottoms',
    gender: 'Women',
    aesthetic: 'Minimalist',
    images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80'],
    description: 'Breathable linen trousers for a relaxed summer look.',
    sustainabilityFeatures: ['Biodegradable', 'Low Impact'],
    isEmerging: false
  },
  {
    id: 'p7',
    name: 'Graphic Print Hoodie',
    price: 75,
    brandId: 'b2',
    category: 'Tops',
    gender: 'Unisex',
    aesthetic: 'Streetwear',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80'],
    description: 'Limited edition graphic hoodie with digital art print.',
    isEmerging: true
  },
  {
    id: 'p8',
    name: 'Upcycled Denim Jacket',
    price: 135,
    brandId: 'b1',
    category: 'Outerwear',
    gender: 'Unisex',
    aesthetic: 'Vintage',
    images: ['https://images.unsplash.com/photo-1527082395-e939b847da0d?auto=format&fit=crop&w=800&q=80'],
    description: 'Unique denim jacket created from vintage Levi\'s.',
    sustainabilityFeatures: ['Upcycled', 'Zero Waste'],
    isEmerging: true
  }
];
