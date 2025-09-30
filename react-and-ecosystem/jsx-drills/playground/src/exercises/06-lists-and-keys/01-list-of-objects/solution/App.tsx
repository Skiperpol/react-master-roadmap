type User = {
    id: number
    firstName: string
    lastName: string
}
const usersList = () => {
    const users: User[] = [
        { id: 1, firstName: "Jan", lastName: "Kowalski" },
        { id: 2, firstName: "Anna", lastName: "Nowak" },
        { id: 3, firstName: "Weronika", lastName: "Kowalczyk" },
    ]

    return (
        users.map((user) => (
            <div key={user.id}>
               {user.firstName + " " + user.lastName}
            </div>
        ))
    )
}

export default usersList