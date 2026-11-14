export type Aesthetic = 'Minimalist' | 'Streetwear' | 'Vintage' | 'Boho' | 'Luxury' | 'Athleisure' | 'Y2K';
export type Category = 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Shoes' | 'Accessories';
export type Gender = 'Men' | 'Women' | 'Unisex';

export interface Brand {
  id: string;
  name: string;
  isSustainable: boolean;
  isEmerging: boolean;
  description: string;
  logo: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  brandId: string;
  category: Category;
  gender: Gender;
  aesthetic: Aesthetic;
  images: string[];
  description: string;
  sustainabilityFeatures?: string[];
  isEmerging?: boolean;
}

export interface UserProfile {
  gender: Gender;
  categories: Category[];
  aesthetic: Aesthetic[];
  budget: 'Budget' | 'Mid-range' | 'Premium';
  sustainabilityFocus: boolean;
  likedProducts: string[];
  passedProducts: string[];
  savedProducts: string[];
  followedBrands: string[];
}
