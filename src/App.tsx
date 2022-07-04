import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header.component";
import Drawer from "./components/Drawer.component";
import Content from "./components/Content.section";
import { TalanaService } from "./services/talana.services";
import { Category, Product } from "./types/category.interface";
import ModalComponent from "./components/modal.component";

const talana = new TalanaService();
const App = () => {
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: "",
    order: 0,
  });
  const [chosenProducts, setChosenProducts] = useState<Product[]>([]);
  const [chosenProductToShow, setchosenProductToShow] = useState<Product>({
    abstract: "",
    category: {
      id: 0,
      name: "",
      order: 0,
    },
    attribute: [],
    code: "",
    description: "",
    name: "",
    photo: "",
    price: 0,
    stock: 0,
    qty: 0,
  });
  const [isModalOpen, setisModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const categories = await talana.fetchCategories();
      setCategories(categories);
    })();
  }, []);

  const onClick = (category: Category) => {
    setSelectedCategory(category);
    setKeyword("");
  };

  const onSearch = (word: string) => {
    setKeyword(word);
  };

  const handleProductClick = (product: Product) => {
    setchosenProductToShow(product);
    setisModalOpen(true);
  };

  const addToCard = (product: Product) => {
    const prevProductList = chosenProducts.filter(
      (p) => p.code !== product.code
    );

    if (product.qty === 0) {
      setChosenProducts((prev) => prevProductList);
    } else {
      // if there is already that product, updates is Qty
      setChosenProducts((prev) => [...prevProductList, product]);
    }
  };

  return (
    <>
      <Header
        onSearch={onSearch}
        productList={chosenProducts}
        addProduct={(p) => addToCard(p)}
      />
      <section>
        <Drawer
          categories={categories}
          onClick={(c) => onClick(c)}
          selectedCategory={selectedCategory}
        />
        <Content
          selectedCategory={selectedCategory}
          keyword={keyword}
          onClick={(p) => handleProductClick(p)}
          addProduct={(p) => addToCard(p)}
        />
      </section>
      <ModalComponent
        open={isModalOpen}
        onClose={() => setisModalOpen(false)}
        product={chosenProductToShow}
        addProduct={(p) => addToCard(p)}
      />
    </>
  );
};

export default App;
