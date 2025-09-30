import { useState, type ReactNode } from "react";
import Button from "./components/ButtonComponent";
import Input from "./components/InputComponent";
import Card from "./components/CardComponent";

const App = () => {
  const JSXComponents: { key: string; node: ReactNode }[] = [
    { key: "btn", node: <Button>New button</Button> },
    {
      key: "input",
      node: <Input onChange={() => console.log("changed")} />,
    },
    { key: "card", node: <Card>Card content</Card> },
  ];

  const [order, setOrder] = useState([0, 1, 2]);

  return (
    <div>
      <button onClick={() => setOrder([...order].reverse())}>Reverse</button>
      {order.map((i) => {
        const { key, node } = JSXComponents[i];
        return <div key={key}>{node}</div>;
      })}
    </div>
  );
};

export default App;
