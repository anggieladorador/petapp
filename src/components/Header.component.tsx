import { useState } from "react";
type HeaderProps = {
  onSearch: (value: string) => void;
};
const Header = ({ onSearch }: HeaderProps) => {
  const [value, setValue] = useState("");

  const onChange = (value: string) => {
    setValue(value);
    onSearch(value);
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span>bolsa</span>
      </div>
    </header>
  );
};

export default Header;
