import { Category } from "../types/category.interface";

export type CategoryProps = {
  categories: Category[];
  onClick: (category: Category) => void;
};
const Drawer = ({ categories, onClick }: CategoryProps) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <span className="sidebar__title">Categorias</span>
        <span>menu</span>
      </div>
      <div className="sidebar__body">
        <ul className="sidebar__list">
          {categories.map((c, index: number) => (
            <li key={index}>
              <button onClick={() => onClick(c)}>{c.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Drawer;
