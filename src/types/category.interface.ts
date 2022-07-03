export interface Category {
  id: number;
  name: string;
  order: number;
}

interface Attribute {
  id: number;
  name: string;
  icon: string;
}
export interface Product {
  abstract: string;
  code: string;
  description: string;
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: Category;
  attribute: Attribute[];
  qty: number;
}
