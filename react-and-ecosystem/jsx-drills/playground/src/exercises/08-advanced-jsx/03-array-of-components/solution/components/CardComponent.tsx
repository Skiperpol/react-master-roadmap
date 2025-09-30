import type { ReactNode } from "react";
import "./components.css";

type CardProp = {
    title?: string;
    children: ReactNode;
}

const Card = ({ title, children }: CardProp) => {
  return (
    <div className="card">
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
}

export default Card
