import type { JSX } from "react";

function wrapWithBox(content: JSX.Element) {
    return <div style={{ border: "1px solid #aaa", padding: "8px" }}>{content}</div>;
  }
  
  const App = () => {
    return (
      <div>
        {wrapWithBox(<p>Hello world</p>)}
        {wrapWithBox(<button>Click me</button>)}
        {wrapWithBox(<input placeholder="Type here..." />)}
      </div>
    );
  };

  export default App