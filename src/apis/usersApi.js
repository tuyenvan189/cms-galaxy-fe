import httpRequest from '../services/httpRequest'

export const fetchUsers = async() => {
    const res = await httpRequest.get(`https://tony-json-server.herokuapp.com/api/users`)
    return res.data;
}

// const addUser = async(newUser) => {
//     const res = await httpRequest.post(`https://tony-json-server.herokuapp.com/api/users`, {
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newUser)
//     })
//     return res.data
// }