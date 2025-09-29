import "./style.css"

function App() {
    return (
      <div>
        <h1 className="title" id="main-title" tabIndex={0}>
          First element
        </h1>
  
        <button className="btn" id="first-btn" tabIndex={1}>
          Click me
        </button>
  
        <p className="paragraph" id="info-text" tabIndex={2}>
          Some text here
        </p>
      </div>
    );
  }
  
  export default App;
  