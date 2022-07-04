import { useState } from "react";
import { formatPrice } from "../utils/utils";
import { Product } from "../types/category.interface";
import { ButtonClasses, IconButton } from "./Button.component";

type ProductItemProps = {
  product: Product;
  onClick: (product: Product) => void;
  addProduct: (product: Product) => void;
};

export const ProductItem = ({
  product,
  onClick,
  addProduct,
}: ProductItemProps) => {
  const [productQty, setProductQty] = useState(product.qty);

  return (
    <div key={product.code} className="article__item">
      <div
        className="article__image-container"
        onClick={() => onClick(product)}
      >
        <img src={product.photo} alt="image" />
      </div>
      <span className="product__text">{product.name}</span>
      <span className="product__text">{formatPrice(product.price)}</span>
      <div className="article__action">
        <input
          type="number"
          name={`detailQty-${product.code}`}
          id="product-input"
          min={0}
          value={productQty}
          onChange={(e) => setProductQty(+e.target.value)}
        />
        <IconButton
          variant={ButtonClasses.icon}
          icon="shopping_cart"
          onClick={() => addProduct({ ...product, qty: productQty })}
        />
      </div>
    </div>
  );
};
