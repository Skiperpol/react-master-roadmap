function App() {
    let booleanValue = true
    let showContent = true

    return (
        <>
            {showContent &&
                <div>
                    {booleanValue ? "TRUE" : "FALSE"}
                </div>
            }
        </>
    )
}

export default App