type ButtonProps = {
  text?: string;
  onClick: () => void;
  icon?: string;
};

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button className="btn" onClick={onClick}>
      {text}
    </button>
  );
};

export const iconButton = ({ icon, onClick }: ButtonProps) => {
  return <button></button>;
};

export const menuButton = ({ text, onClick }: ButtonProps) => {
  return <button></button>;
};

export default Button;
