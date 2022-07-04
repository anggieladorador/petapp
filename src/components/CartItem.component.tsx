import { useEffect, useState } from "react";
import { formatPrice } from "../utils/utils";
import { Product } from "../types/category.interface";

type ItemProps = {
  product: Product;
  addProduct: (product: Product) => void;
};
const CartItem = ({ product, addProduct }: ItemProps) => {
  const [value, setValue] = useState(product.qty);

  useEffect(() => {
    setValue(product.qty);
  }, [product.qty]);

  const onChange = (value: number) => {
    setValue(value);
    addProduct({ ...product, qty: value });
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{product.name}</span>
        <span>{formatPrice(product.price)}</span>
      </div>
      <div>
        <input
          type="number"
          style={{ width: 60 }}
          defaultValue={product.qty}
          value={value}
          onChange={(e) => onChange(+e.target.value)}
        />
      </div>
      <span>
        Sub-total: {product.qty && formatPrice(product.qty * product.price)}
      </span>
    </>
  );
};
export default CartItem;
