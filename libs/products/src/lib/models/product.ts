import { Category } from './category';

export class Product {
  id?: string;
  name?: string;
  description?: string;
  richDescription?: string;
  image?: string;
  images?: string[];
  brand?: string;
  price?: number;
  donation?: number;
  category?: Category;
  countInStock?: number;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  dateCreated?: string;
  namep1?: string;
  iconp1?: string;
  descriptionp1?: string;
  namep2?: string;
  iconp2?: string;
  descriptionp2?: string;
  namep3?: string;
  iconp3?: string;
  descriptionp3?: string;
}
