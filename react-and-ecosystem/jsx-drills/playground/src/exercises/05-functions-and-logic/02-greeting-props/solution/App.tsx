type Greeting = {
    name?: string;
}

const App = (greeting: Greeting) => {
    return(
        <>
            {greeting.name ? "Hello, " + greeting.name : "Hello, stranger!"}
        </>
    )
}

export default App