import { useState } from "react";
import { formatPrice } from "../common/utils";
import { Product } from "../types/category.interface";

type HeaderProps = {
  onSearch: (value: string) => void;
  productList: Product[];
  addProduct: (product: Product) => void;
};
const Header = ({ onSearch, productList, addProduct }: HeaderProps) => {
  const [value, setValue] = useState("");
  const [isBagOpen, setIsBagOpen] = useState(false);

  const onChange = (value: string) => {
    setValue(value);
    onSearch(value);
  };

  const shoppingListClassName = isBagOpen
    ? "bag__container bag__container--active"
    : "bag__container";

  const totalPrice = () => {
    const initialPrice = 0;
    return productList.reduce(
      (prev, current) => prev + current.price * current.qty,
      initialPrice
    );
  };

  return (
    <header className="header">
      <div className="logo__container">
        <h1 className="logo">Petshop</h1>
      </div>
      <div className="nav">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Buscar"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span
          className="material-icons clickeable"
          onClick={() => setIsBagOpen(!isBagOpen)}
        >
          shopping_bag
        </span>
        <div className={shoppingListClassName}>
          <span style={{ fontSize: 16 }}>Resumen de compras</span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 80px 1fr",
              rowGap: 8,
              columnGap: 16,
              whiteSpace: "nowrap",
              justifyContent: "end",
            }}
          >
            {productList.map((p) => (
              <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>
                    {p.name}
                  </span>
                  <span>{formatPrice(p.price)}</span>
                </div>
                <div>
                  <input
                    type="number"
                    style={{ width: 60 }}
                    name=""
                    id=""
                    defaultValue={p.qty}
                    onChange={(e) => addProduct({ ...p, qty: +e.target.value })}
                  />
                </div>
                <span>Sub-total: {p.qty && formatPrice(p?.qty * p.price)}</span>
              </>
            ))}
            <div>
              <span>SubtTotal: {formatPrice(totalPrice())}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
