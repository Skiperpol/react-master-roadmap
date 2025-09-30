import { useState } from "react";
type item = {
  id: number;
  text: number;
};
const Checkboxes = () => {
  const [items, setItems] = useState<item[]>([
    { id: 1, text: 1 },
    { id: 2, text: 2 },
    { id: 3, text: 3 },
  ]);

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const addItem = () => {
    const lastId = items.length > 0 ? items[items.length - 1].id : 0;
    const nextId = lastId + 1;
    setItems([...items, { id: nextId, text: nextId }]);
  };

  const reorder = () => {
    setItems([...items].reverse());
  };

  return (
    <div>
      <button onClick={reorder}>Reorder</button>
      <button onClick={addItem}>Add</button>
      {items.map((item) => (
        <li key={item.id}>
          <input type="checkbox" />
          {item.text}
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </li>
      ))}
    </div>
  );
};

export default Checkboxes;
