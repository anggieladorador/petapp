import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header.component";
import Drawer from "./components/Drawer.component";
import Content from "./components/Content.section";
import { TalanaService } from "./services/talana.services";
import { Category } from "./types/category.interface";

const talana = new TalanaService();
const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: "",
    order: 0,
  });
  const [keyword, setKeyword] = useState("");

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

  return (
    <>
      <Header onSearch={onSearch} />
      <section>
        <Drawer categories={categories} onClick={(c) => onClick(c)} />
        <Content selectedCategory={selectedCategory} keyword={keyword} />
      </section>
    </>
  );
};

export default App;
