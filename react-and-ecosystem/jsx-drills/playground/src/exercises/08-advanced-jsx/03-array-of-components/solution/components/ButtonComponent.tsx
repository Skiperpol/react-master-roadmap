import React from "react";
import "./components.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

 const Button = ({ children, onClick, type = "button" }: ButtonProps) => {
  return (
    <button className="btn" type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button