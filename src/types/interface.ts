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

export const emptyCategory = {
  id: 0,
  name: "",
  order: 0,
};

export const emptyProduct = {
  abstract: "",
  category: emptyCategory,
  attribute: [],
  code: "",
  description: "",
  name: "",
  photo: "",
  price: 0,
  stock: 0,
  qty: 0,
};
