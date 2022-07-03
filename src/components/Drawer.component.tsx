import { Category } from "../types/category.interface";
import Button, { ButtonClasses } from "./Button.component";

export type CategoryProps = {
  categories: Category[];
  onClick: (category: Category) => void;
  selectedCategory: Category;
};
const Drawer = ({ categories, onClick, selectedCategory }: CategoryProps) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <span className="sidebar__title">Categorias</span>
        <span className="material-icons">menu</span>
      </div>
      <div className="sidebar__body">
        <ul className="sidebar__list">
          {categories.map((c, index: number) => (
            <Button
              active={selectedCategory.id === c.id}
              onClick={() => onClick(c)}
              text={c.name}
              variant={ButtonClasses.menu}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Drawer;
