import { createElement, Fragment } from "react";

function App() {
    return createElement(Fragment, null,
        createElement("h1", null, "Hello TSX"),
        createElement("p", null, "Testing")
    );
}

export default App
