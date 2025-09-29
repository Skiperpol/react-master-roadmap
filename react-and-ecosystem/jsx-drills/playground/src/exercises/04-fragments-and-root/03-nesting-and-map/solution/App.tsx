import React from "react";

const data = [
  { id: 1, name: "Jan", age: 20 },
  { id: 2, name: "Anna", age: 25 },
  { id: 3, name: "Kuba", age: 30 },
];

const App = () => {
  return (
    <div>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <h3>{item.name}</h3>
          <p>Wiek: {item.age}</p>
        </React.Fragment>
      ))}
    </div>
  );
};
export default App;
