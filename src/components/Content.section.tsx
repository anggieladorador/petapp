import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { TalanaService } from "../services/talana.services";
import { Category, Product } from "../types/category.interface";
import { ProductItem } from "./ProductItem.component";
import Pagination from "./Pagination.component";

const talana = new TalanaService();

type ContentProps = {
  selectedCategory?: Category;
  keyword: string;
  onClick: (product: Product) => void;
  addProduct: (product: Product) => void;
};

const ITEMS_BY_PAGE = 4;

const Content = ({
  selectedCategory,
  keyword,
  onClick,
  addProduct,
}: ContentProps) => {
  // just stores the original product list

  const [products, setProducts] = useState<Product[]>([]);
  // will store product according chosen category
  const [pageNumber, setPageNumber] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [productsPage, setProductsPage] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const products = await talana.fetchProducts();
        setProducts(products);

        // number of pages
        const number = Math.ceil(products.length / ITEMS_BY_PAGE);
        setPageNumber(number);
        const list = sliceProducts(products, ITEMS_BY_PAGE);
        setProductsPage(list[activePage]);
      } catch (error) {
        setProducts([]);
      }
    })();
  }, []);

  useEffect(() => {
    const list = sliceProducts(products, ITEMS_BY_PAGE);
    setProductsPage(list[activePage]);
  }, [activePage]);

  const sliceProducts = (arr: Product[], chunkSize: number) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };

  // set products if there is any category selected
  useEffect(() => {
    if (selectedCategory?.id !== 0) {
      const prod = products.filter(
        (product) => product.category.id === selectedCategory?.id
      );
      setProductsPage(prod);
    }
    if (keyword !== "") {
      const options = {
        keys: [
          "abstract",
          "attributes.name",
          "category.name",
          "name",
          "decription",
        ],
        threshold: 0.3,
      };
      const fuse = new Fuse(products, options);
      const list = fuse.search(keyword);
      const prod = list.map((l) => l.item);
      setProductsPage(prod);
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
        {productsPage &&
          productsPage.map((p) => (
            <ProductItem
              addProduct={(p) => addProduct(p)}
              onClick={onClick}
              product={p}
            />
          ))}
      </div>
      <Pagination
        activePage={activePage}
        pageNumber={pageNumber}
        onClick={(index) => setActivePage(index)}
      />
    </main>
  );
};
export default Content;
