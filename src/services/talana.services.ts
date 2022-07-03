import { TALANA_URL } from "../constants";

export class TalanaService {
  fetchCategories = async () => {
    const response = await fetch(`${TALANA_URL}/product-category`);
    const cat = response.json();
    return cat;
  };

  fetchProducts = async () => {
    const response = await fetch(`${TALANA_URL}/product`);
    const prod = response.json();
    return prod;
  };
}
