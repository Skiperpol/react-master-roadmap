function App() {
    const numbersArray = [1, 2, 3, 5, 4]
    return (
        <ul>
            {numbersArray.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    )
}

export default App