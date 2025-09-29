type User = {
    firstName?: string,
    lastName?: string
}

const formatName = (user: User) => {
    return ((user.firstName ? user.firstName + " " : "") + (user.lastName ? user.lastName : ""))
}

const App = () => {
    const userExample: User = {
        firstName: "Jan",
        lastName: "Kowalski"
    }
    return <h2>{formatName(userExample)}</h2>
}

export default App