import type { ReactNode } from "react";
import "./style.css"

type CardProps = {
  children: ReactNode;
  title?: ReactNode;
};

const Card = ({ children, title }: CardProps) => {
  return (
    <div className="card">
      {title && <div className="card-title">{title}</div>}
      {children}
    </div>
  );
};

export default Card