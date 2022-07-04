import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { TalanaService } from "../services/talana.services";
import { Category, Product } from "../types/category.interface";
import { ProductItem } from "./ProductItem.component";

const talana = new TalanaService();

type ContentProps = {
  selectedCategory?: Category;
  keyword: string;
  onClick: (product: Product) => void;
  addProduct: (product: Product) => void;
};
const Content = ({
  selectedCategory,
  keyword,
  onClick,
  addProduct,
}: ContentProps) => {
  // just stores the original product list
  const [products, setProducts] = useState<Product[]>([]);
  // will store product according chosen category
  const [productsByCat, setProductsByCat] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const products = await talana.fetchProducts();
      setProducts(products);
      setProductsByCat(products);
    })();
  }, []);

  // set products if there is any category selected
  useEffect(() => {
    if (selectedCategory?.id !== 0) {
      const prod = products.filter(
        (product) => product.category.id === selectedCategory?.id
      );
      setProductsByCat(prod);
    }
    if (keyword !== "") {
      const options = {
        includeScore: true,
        keys: [
          "abstract",
          "attributes.name",
          "category.name",
          "name",
          "decription",
        ],
      };
      const fuse = new Fuse(products, options);
      const list = fuse.search(keyword);
      const prod = list.map((l) => l.item);
      setProductsByCat(prod);
    }
  }, [selectedCategory, products, keyword]);

  return (
    <main className="content">
      <div>
        <h2 className="content__title">
          {selectedCategory?.name ||
            (keyword !== "" && ` Resultados de búsqueda: ${keyword}`) ||
            "Productos"}
        </h2>
      </div>
      <div className="breadcrumb">
        <span>Home</span>
        <span className="material-icons breadcrumb__divider">
          keyboard_arrow_right
        </span>
        <span>Categorias</span>
        {selectedCategory?.id !== 0 && (
          <>
            <span className="material-icons breadcrumb__divider">
              keyboard_arrow_right
            </span>
            <span>{selectedCategory?.name}</span>
          </>
        )}
      </div>
      <div className="articles__container">
        {productsByCat.map((p) => (
          <ProductItem
            addProduct={(p) => addProduct(p)}
            onClick={onClick}
            product={p}
          />
        ))}
      </div>
    </main>
  );
};
export default Content;
