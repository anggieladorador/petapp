import { useState } from "react";
import { Product } from "../types/category.interface";

type HeaderProps = {
  onSearch: (value: string) => void;
  productList: Product[];
};
const Header = ({ onSearch, productList }: HeaderProps) => {
  const [value, setValue] = useState("");
  const [isBagOpen, setIsBagOpen] = useState(false);

  const onChange = (value: string) => {
    setValue(value);
    onSearch(value);
  };

  const shoppingListClassName = isBagOpen
    ? "bag__container bag__container--active"
    : "bag__container";

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
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span
          className="material-icons"
          onClick={() => setIsBagOpen(!isBagOpen)}
        >
          shopping_bag
        </span>
        <div className={shoppingListClassName}>
          <span>Resumen de compras</span>
          <div>
            {productList.map((p) => (
              <>
                <span>{p.name}</span>
                <span>{p?.qty}</span>
              </>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
