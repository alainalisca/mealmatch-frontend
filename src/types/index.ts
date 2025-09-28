export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface Cook {
  _id: string;
  businessName: string;
  description: string;
  specialties: string[];
  averageRating: number;
  totalOrders: number;
  averagePrepTime: number;
  profileImage?: string;
  isVerified: boolean;
  distance: number;
}

export interface Recipe {
  _id: string;
  name: string;
  description: string;
  cookId: {
    _id: string;
    businessName: string;
    averageRating: number;
  };
  basePrice: number;
  prepTime: number;
  nutrition: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  };
  dietaryTags: string[];
  mealType: string[];
  isAvailable: boolean;
  averageRating: number;
  reviewCount: number;
}