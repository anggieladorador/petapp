type ButtonProps = {
  text?: string;
  onClick: () => void;
  icon?: string;
  variant?: ButtonClasses;
  active?: boolean;
};

export enum ButtonClasses {
  menu = "sidebar__menu-item",
  modal = "modal__button",
  icon = "icon__button",
}

const Button = ({ text, onClick, variant, active }: ButtonProps) => {
  const buttonClassName = active
    ? `btn ${variant} ${variant}--active`
    : `btn ${variant}`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      {text}
    </button>
  );
};

export const IconButton = ({ icon, onClick, variant }: ButtonProps) => {
  return (
    <button className={`btn ${variant}`}>
      <span className="material-icons" onClick={onClick}>
        {icon}
      </span>
    </button>
  );
};

export default Button;
