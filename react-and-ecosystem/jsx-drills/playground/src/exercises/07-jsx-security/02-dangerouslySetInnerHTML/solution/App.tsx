const App = () => {
    const test = "<strong>Cześć!</strong>"
    return <div dangerouslySetInnerHTML={{ __html: test }} />;
}

export default App