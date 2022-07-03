import { useEffect, useState } from "react";
import { TalanaService } from "../services/talana.services";
import { Category, Product } from "../types/category.interface";
import Fuse from "fuse.js";
import { ButtonClasses, IconButton } from "./Button.component";

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
  const [productQty, setProductQty] = useState(1);

  useEffect(() => {
    (async () => {
      const products = await talana.fetchProducts();
      setProducts(products);
      setProductsByCat(products);
    })();
  }, []);

  // set products if there is any category selected
  useEffect(() => {
    if (selectedCategory?.id != 0) {
      const prod = products.filter(
        (product) => product.category.id === selectedCategory?.id
      );
      setProductsByCat(prod);
    }
    if (keyword != "") {
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
  }, [selectedCategory, keyword]);

  const handleProducts = () => {};

  return (
    <main className="content">
      <div>{selectedCategory?.name || "Productos"}</div>
      <div className="breadcrumb__container">breadcrumb</div>
      <div className="articles__container">
        {productsByCat.map((p) => (
          <div key={p.code} className="article__item">
            <div
              className="article__image-container"
              onClick={() => onClick(p)}
            >
              <img src={p.photo} alt="image" />
            </div>
            <div className="article__detail">
              <span className="product__text">{p.name}</span>
              <span className="product__text">precio</span>
            </div>
            <div className="article__action">
              <input
                type="number"
                name={`detailQty-${p.code}`}
                id=""
                min={1}
                defaultValue={1}
                onChange={(e) => setProductQty(+e.target.value)}
              />
              <IconButton
                variant={ButtonClasses.icon}
                icon="shopping_cart"
                onClick={() => addProduct({ ...p, qty: productQty })}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
export default Content;
