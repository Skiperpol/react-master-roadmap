type Greeting = {
    name?: string;
}

const App = (greeting: Greeting) => {
    return(
        <>
            "Hello, {greeting.name ? greeting.name : "stranger"}!"
        </>
    )
}

export default App