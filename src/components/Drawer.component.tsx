import { useState } from "react";
import { Category } from "../types/category.interface";
import Button, { ButtonClasses } from "./Button.component";

export type CategoryProps = {
  categories: Category[];
  onClick: (category: Category) => void;
  selectedCategory: Category;
};
const Drawer = ({ categories, onClick, selectedCategory }: CategoryProps) => {
  const [open, setOpen] = useState(true);
  const classNameSidebar = open ? "sidebar sidebar--active" : "sidebar";
  return (
    <aside className={classNameSidebar}>
      {open ? (
        <>
          <div className="sidebar__header">
            <span className="sidebar__title">Categorias</span>
            <span
              className="material-icons clickeable"
              onClick={() => setOpen(!open)}
            >
              menu
            </span>
          </div>
          <div className="sidebar__body">
            <ul className="sidebar__list">
              {categories.map((c) => (
                <Button
                  active={selectedCategory.id === c.id}
                  onClick={() => onClick(c)}
                  text={c.name}
                  variant={ButtonClasses.menu}
                />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <span className="material-icons" onClick={() => setOpen(!open)}>
          menu
        </span>
      )}
    </aside>
  );
};

export default Drawer;
